export const DEFAULT_LANG = 'en_US'
const dict = {
  'Web UI': 0,
  'Local Monero blockchain explorer': 1,
  Explorer: 2,
  'Explorer is listening': 3,
  'Explorer is not listening': 4,
  'Monero restricted RPC is not available': 5,
} as const
export type LangDict = Record<(typeof dict)[keyof typeof dict], string>
export default dict
