# Updating upstream

1. Inspect upstream refs with `git ls-remote --tags https://github.com/duggavo/MoneroBlock.git`
   and the application's `Version` constant in upstream `main.go`. The packaged
   source is selected by the `upstream/` gitlink, not by an image tag.
2. Fetch in `upstream/`, check out the reviewed commit, and keep that checkout
   clean. Update `patches/startos-rpc.patch` against the new clean source. Its
   retirement conditions are recorded in `patches/README.md`.
3. Build the Dockerfile to check that the patch applies without fuzz and that
   `go mod verify` and `go build -mod=readonly` pass. Refresh dependency hunks only
   after reviewing the module changes. Review and refresh the two base-image
   digests in `Dockerfile` separately from an application bump.
4. Verify the supported Monero package's configuration volume, RPC host, internal
   port and authentication, then update `startos/dependencies.ts` if needed.
5. Set the application version and package revision in `startos/versions/current.ts`.
   Use a tag of the form `v<application-version>_<package-revision>` for a release.
6. Run the SDK checks and package build, then verify authenticated and unauthenticated
   RPC, block and transaction lookup, a short chain, restart, upgrade and teardown
   on StartOS. Confirm backup/restore before describing it as tested.
