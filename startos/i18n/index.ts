import { setupI18n } from '@start9labs/start-sdk'
import dict, { DEFAULT_LANG } from './dictionaries/default'
import translations from './dictionaries/translations'
export const i18n = setupI18n(dict, translations, DEFAULT_LANG)
