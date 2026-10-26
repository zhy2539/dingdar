-- Cloudflare D1 初始表结构
-- 在 Cloudflare 后台 → Workers & Pages → D1 → 选中数据库 → Console 里粘贴执行。

CREATE TABLE IF NOT EXISTS inquiries (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at  TEXT NOT NULL,
  name        TEXT,
  email       TEXT NOT NULL,
  company     TEXT,
  country     TEXT,
  phone       TEXT,
  message     TEXT,
  source_page TEXT,
  lang        TEXT,
  extra       TEXT,
  status      TEXT NOT NULL DEFAULT 'new',
  user_agent  TEXT,
  ip_hash     TEXT
);

CREATE INDEX IF NOT EXISTS idx_inquiries_created ON inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON inquiries (status);
