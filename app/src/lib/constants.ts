export const TAB_IDS = {
  DASHBOARD:    'dashboard',
  IMPORT:       'import',
  PRODUCTION:   'production',
  TRANSACTIONS: 'transactions',
  SETTINGS:     'settings',
} as const;

export type TabId = (typeof TAB_IDS)[keyof typeof TAB_IDS];

export const TAB_LABELS: Record<TabId, string> = {
  dashboard:    'Dashboard',
  import:       'Import Planner',
  production:   'Production',
  transactions: 'Transactions',
  settings:     'Settings',
};

export const PURPOSES = {
  SELL:     'sell',
  USE:      'use',
  UNTAGGED: 'untagged',
} as const;

export const WHITELIST_MODES = {
  WHITELIST_ONLY: 'whitelist_only',
  ALL:            'all',
  WHITELIST_PLUS: 'whitelist_plus',
} as const;

export const API_BASE = '/api';
