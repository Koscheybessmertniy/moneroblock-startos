<p align="center">
  <img src="icon.svg" alt="Monero logo" width="21%" />
</p>

# MoneroBlock on StartOS

> Everything not listed in this document should behave the same as upstream
> MoneroBlock. If a feature, setting, or behavior is not mentioned here, the
> upstream documentation is accurate and fully applicable — see the
> Documentation section of `instructions.md` for links.

[MoneroBlock](https://github.com/duggavo/MoneroBlock) is a lightweight block and
transaction explorer. This package connects it to the installed Monero service.

- Wrapper repository: https://github.com/Koscheybessmertniy/moneroblock-startos

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [File Models](#file-models)
- [Dependencies](#dependencies)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Actions](#actions)
- [Tasks](#tasks)
- [Health Checks](#health-checks)
- [Backups and Restore](#backups-and-restore)
- [Limitations and Differences](#limitations-and-differences)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

## Image and Container Runtime

The Dockerfile builds a static Go executable from the pinned, clean `upstream/`
submodule and applies `patches/startos-rpc.patch` only inside the builder. Builder
and runtime bases are pinned by digest. Only x86_64 is offered.

The `moneroblock` subcontainer runs `/usr/local/bin/start-moneroblock`, which sets
`MONERO_CONFIG=/chain/monero.conf` and starts the explorer on port 31312 with the
resolved restricted-RPC address. Credentials are read by the executable rather
than passed in command arguments. The process runs as root inside its
subcontainer so it can read the dependency's configuration; that mount is read-only.

## Volume and Data Layout

MoneroBlock keeps its recent-block cache in memory. Its own `main` volume is kept
for package backup continuity and is not mounted into the application container.

| Resource | Mount | Purpose |
| --- | --- | --- |
| Own `main` volume | Not mounted | Package backup continuity; no application data |
| Monero `monerod` volume | `/chain`, read-only | Reads `monero.conf` for RPC credentials |

The dependency mount is a directory because StartOS does not mount a dependency
file on its own. The explorer never opens the LMDB files visible under that
read-only directory. It creates no blockchain copy or index database.

## File Models

None. The package does not own or rewrite a Monero configuration file. It reads
the node's `rpc-login` value once at application startup; changing it requires
restarting MoneroBlock. Connection settings are supplied as startup arguments.

## Dependencies

Monero is required and must be running. The exact supported package revision is
set in `startos/dependencies.ts`, so changes to the node's wrapper are reviewed
before widening compatibility. Dependency metadata reports status in StartOS;
it does not itself block the process from starting.

## Network Access and Interfaces

The `ui` interface exposes HTTP on internal port 31312 through host `ui-multi`.
StartOS determines where this interface is published.

The package resolves Monero's `rpc-restricted` host at internal port 18089,
selects its plaintext bridge address, and watches only that derived address.
It does not use wallet RPC or a public remote node. No other outbound connections
are configured by the package.

## Installation and First-Run Flow

Initialization registers the interface, empty actions, backups and the required
Monero dependency. No account creation or blockchain synchronization is performed.
Starting the application reads the RPC credentials and begins polling recent
block headers. A missing Monero bridge address surfaces a startup error; address
changes rerun startup. Background cache polling retries RPC failures.

## Actions

None. RPC credentials belong to the Monero service; edit them there and restart
MoneroBlock afterwards.

## Tasks

None. No setup task or credential prompt is introduced by this package.

## Health Checks

The daemon's `moneroblock` readiness check reports whether port 31312 is listening.
It establishes web-server availability, not successful RPC access. If it is green
but pages fail to load, inspect the log and check the Monero service and its RPC
credentials. An RPC failure during cache refresh is retried without terminating
the background worker.

## Backups and Restore

Only the package's own `main` volume is included. It contains no blockchain,
wallet or node RPC credentials. Monero backups are separate. Restore re-registers
the package through the SDK's standard restore initializer; the live Monero
configuration is read again when the application starts.

## Limitations and Differences

The carried patch enables Digest authentication, preserves colons and equals
signs in RPC passwords, handles a short chain without unsigned underflow,
synchronizes the in-memory cache and retries cache-refresh failures. It also
removes unused HTTP-framework dependencies and records Go module checksums.

The explorer cannot recover transaction data removed by pruning. It reads RPC
credentials only at startup, so it does not automatically follow a credential
change. The browser application and these instructions remain in English;
package descriptions and StartOS status labels are localized.

## Quick Reference for AI Consumers

This summary lists the resources an administering agent needs to identify.

```yaml
package_id: moneroblock
image: custom Dockerfile from upstream submodule and patches
architectures: [x86_64]
subcontainers: [moneroblock]
volumes:
  main: not mounted
file_models: []
startos_managed_env_vars: []
dependencies: [monerod]
interfaces:
  ui: { type: ui, port: 31312 }
actions: []
tasks: []
health_checks: [moneroblock]
```
