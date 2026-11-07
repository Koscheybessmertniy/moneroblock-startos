# Carried patches

`startos-rpc.patch` applies to the clean upstream submodule during the container
build. Do not modify the submodule or apply this patch in the checkout.

The patch connects RPC credentials to go-monero's Digest HTTP client, reads
credentials from the read-only node configuration, preserves colons and equals
signs in passwords, bounds the recent-block range on small chains, synchronizes
the block cache, and retries background RPC failures. It also runs gofmt and
records the minimal Go module graph and its checksums; unused Fiber dependencies
are removed.

Retire the corresponding hunks when upstream provides equivalent authentication,
cache synchronization and retry behavior, and small-chain range handling. Remove
the dependency hunks when upstream's module graph matches. Re-run the authenticated
and unauthenticated RPC checks before retiring any hunk.
