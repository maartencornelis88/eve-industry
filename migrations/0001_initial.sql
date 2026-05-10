CREATE TABLE IF NOT EXISTS parameters (
  key   TEXT PRIMARY KEY,
  value TEXT
);

CREATE TABLE IF NOT EXISTS whitelist (
  type_id    INTEGER PRIMARY KEY,
  name       TEXT,
  category   TEXT,
  whitelisted INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS market_snapshots (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  type_id          INTEGER,
  snapshot_date    TEXT,
  keepstar_price   REAL,
  jita_sell        REAL,
  jita_buy         REAL,
  volume_m3        REAL,
  shipping_cost    REAL,
  profit           REAL,
  margin_pct       REAL,
  cap_utilis       REAL,
  qty_on_market    INTEGER,
  vale_daily_volume REAL,
  days_of_stock    REAL
);

CREATE TABLE IF NOT EXISTS transactions (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  char_id          TEXT,
  char_name        TEXT,
  transaction_date TEXT,
  type_id          INTEGER,
  type_name        TEXT,
  quantity         INTEGER,
  unit_price       REAL,
  total_value      REAL,
  transaction_type TEXT,
  location         TEXT,
  purpose          TEXT DEFAULT 'untagged'
);

CREATE TABLE IF NOT EXISTS blueprints (
  type_id  INTEGER PRIMARY KEY,
  name     TEXT,
  bp_type  TEXT,
  me       INTEGER DEFAULT 0,
  te       INTEGER DEFAULT 0,
  runs     INTEGER DEFAULT -1,
  location TEXT
);

CREATE TABLE IF NOT EXISTS import_runs (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  run_date         TEXT,
  total_isk_budget REAL,
  notes            TEXT
);

CREATE TABLE IF NOT EXISTS import_run_items (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  run_id     INTEGER,
  type_id    INTEGER,
  type_name  TEXT,
  quantity   INTEGER,
  unit_price REAL,
  total_cost REAL,
  purpose    TEXT DEFAULT 'sell'
);

CREATE TABLE IF NOT EXISTS sde_items (
  type_id         INTEGER PRIMARY KEY,
  name            TEXT,
  volume          REAL,
  market_group_id INTEGER,
  category        TEXT
);

CREATE TABLE IF NOT EXISTS sde_bom (
  id                 INTEGER PRIMARY KEY AUTOINCREMENT,
  blueprint_type_id  INTEGER,
  material_type_id   INTEGER,
  quantity           INTEGER,
  activity           INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS stock_targets (
  type_id    INTEGER PRIMARY KEY,
  type_name  TEXT,
  target_qty INTEGER,
  alert_below INTEGER
);

-- Default parameters
INSERT OR IGNORE INTO parameters (key, value) VALUES
  ('whitelist_mode',           'whitelist_only'),
  ('min_value',                '0'),
  ('max_value',                '999999999999'),
  ('category_filter',          ''),
  ('for_sale_in_keepstar_only','true'),
  ('min_margin_pct',           '0'),
  ('isk_per_m3',               '400'),
  ('collateral_pct',           '0.01'),
  ('broker_fee_pct',           '0.03'),
  ('sales_tax_pct',            '0.036'),
  ('structure_id',             '1053654548169'),
  ('jita_station_id',          '60003760'),
  ('region_forge',             '10000002'),
  ('region_vale',              '10000003'),
  ('history_days',             '30');
