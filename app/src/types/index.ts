export interface Parameter {
  key: string;
  value: string;
}

export interface WhitelistItem {
  type_id: number;
  name: string;
  category: string;
  whitelisted: number;
}

export interface MarketSnapshot {
  id: number;
  type_id: number;
  snapshot_date: string;
  keepstar_price: number;
  jita_sell: number;
  jita_buy: number;
  volume_m3: number;
  shipping_cost: number;
  profit: number;
  margin_pct: number;
  cap_utilis: number;
  qty_on_market: number;
  vale_daily_volume: number;
  days_of_stock: number;
}

export interface Transaction {
  id: number;
  char_id: string;
  char_name: string;
  transaction_date: string;
  type_id: number;
  type_name: string;
  quantity: number;
  unit_price: number;
  total_value: number;
  transaction_type: string;
  location: string;
  purpose: string;
}

export interface Blueprint {
  type_id: number;
  name: string;
  bp_type: string;
  me: number;
  te: number;
  runs: number;
  location: string;
}

export interface ImportRun {
  id: number;
  run_date: string;
  total_isk_budget: number;
  notes: string;
}

export interface ImportRunItem {
  id: number;
  run_id: number;
  type_id: number;
  type_name: string;
  quantity: number;
  unit_price: number;
  total_cost: number;
  purpose: string;
}

export interface SdeItem {
  type_id: number;
  name: string;
  volume: number;
  market_group_id: number;
  category: string;
}

export interface StockTarget {
  type_id: number;
  type_name: string;
  target_qty: number;
  alert_below: number;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
}
