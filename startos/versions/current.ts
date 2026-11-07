import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'
export const current = VersionInfo.of({
  version: '0.1.2:2',
  releaseNotes: {
    en_US:
      'Prepare community distribution with pinned upstream and container sources, build-time patches, standard CI, and localized package metadata. Requires Monero 0.18.5.4:3 and StartOS 0.4.1 or later.',
    es_ES:
      'Prepara la distribución comunitaria con fuentes e imágenes fijadas, parches de compilación, CI estándar y metadatos traducidos. Requiere Monero 0.18.5.4:3 y StartOS 0.4.1 o posterior.',
    de_DE:
      'Vorbereitung der Community-Veröffentlichung mit festgelegten Quellen und Images, Build-Patches, Standard-CI und übersetzten Paketmetadaten. Erfordert Monero 0.18.5.4:3 und StartOS 0.4.1 oder neuer.',
    fr_FR:
      'Prépare la distribution communautaire avec des sources et images figées, des correctifs de compilation, une CI standard et des métadonnées traduites. Nécessite Monero 0.18.5.4:3 et StartOS 0.4.1 ou ultérieur.',
    pl_PL:
      'Przygotowanie do dystrybucji społecznościowej: przypięte źródła i obrazy, łatki kompilacji, standardowe CI i przetłumaczone metadane. Wymaga Monero 0.18.5.4:3 oraz StartOS 0.4.1 lub nowszego.',
  },
  migrations: { up: async () => {}, down: IMPOSSIBLE },
})
