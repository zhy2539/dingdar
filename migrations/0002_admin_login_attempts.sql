-- 后台登录失败限流
-- 在 Cloudflare D1 中执行一次；用于 /api/admin/login 的 IP 哈希失败计数。
CREATE TABLE IF NOT EXISTS admin_login_attempts (
  ip_hash      TEXT NOT NULL,
  attempted_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_admin_login_attempts_ip_time
  ON admin_login_attempts (ip_hash, attempted_at DESC);
