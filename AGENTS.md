# Package maintenance

- Clone with `--recurse-submodules`. Keep `upstream/` clean at its gitlink pin;
  the Dockerfile applies `patches/startos-rpc.patch` to a build-only copy.
- Read the workspace packaging guide before changing SDK code. `npm ci` installs
  the pinned SDK; run `make x86` in a StartOS packaging workspace to build.
- Only x86_64 is declared. Keep the five reusable CI wrappers aligned with
  Start9's guide. Registry release jobs run only in the Start9-Community fork.
- Never commit a workspace signing key or service credentials. `.startos/` belongs
  beside the package repo, not inside it.
