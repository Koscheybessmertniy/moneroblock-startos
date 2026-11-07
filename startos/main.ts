import { i18n } from './i18n'
import { sdk } from './sdk'
export const main = sdk.setupMain(async ({ effects }) => {
  const address = await sdk.host
    .getBridgeAddress(effects, {
      packageId: 'monerod',
      hostId: 'rpc-restricted',
      internalPort: 18089,
      ssl: false,
    })
    .const()
  if (!address) throw new Error(i18n('Monero restricted RPC is not available'))
  return sdk.Daemons.of(effects).addDaemon('moneroblock', {
    subcontainer: sdk.SubContainer.of(
      effects,
      { imageId: 'moneroblock' },
      sdk.Mounts.of().mountDependency({
        dependencyId: 'monerod',
        volumeId: 'monerod',
        subpath: null,
        mountpoint: '/chain',
        readonly: true,
      }),
      'moneroblock',
    ),
    exec: {
      command: ['/usr/local/bin/start-moneroblock', `http://${address}`],
      user: 'root',
    },
    ready: {
      display: i18n('Explorer'),
      fn: () =>
        sdk.healthCheck.checkPortListening(effects, 31312, {
          successMessage: i18n('Explorer is listening'),
          errorMessage: i18n('Explorer is not listening'),
        }),
    },
    requires: [],
  })
})
