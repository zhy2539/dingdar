# DINGDAR 铸造独立站 — 项目交接 README

> 本文档用于项目跨工具 / 跨 Agent 交接（如 Accio Work、其他 AI 办公软件），以及日常运维。
>
> **请新接手的 Agent 先完整阅读本文档再动手。**

***

## 1. 项目是什么

| 项      | 内容                                                                                                                                                    |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| 站点     | [https://dingdar.com](https://dingdar.com)（与 [https://www.dingdar.com](https://www.dingdar.com) 均已生效，HTTPS 正常）                                        |
| 定位     | 面向海外 B2B 大客户的铸造件独立站，目标是获取询盘（非电商、无购物车 / 支付）                                                                                                            |
| 目标客户   | 矿山 / 砂石骨料企业、破碎设备整机厂（OEM）、工程机械 & 矿山配件批发商 / 贸易商；市场：非洲 / 东南亚 / 中东 / 南美 / 俄罗斯 / 澳洲                                                                        |
| 公司事实源  | Henan Dingdar Machinery Equipment Manufacture Co., Ltd.（河南丁达尔机械设备制造有限公司）                                                                              |
| 网站对外口径 | Since 1986、180,000 m² 厂区、720+ 员工、52 R&D、4 条铸造路线（green sand / shell moulding / lost foam / investment）、5,400+ 件类型；材料 Mn13/Mn18、Cr15–Cr26、合金钢、GGG40/50/60 |

## 2. 技术架构（Astro 静态前端 + Cloudflare 询盘后端）

| 层  | 选型                                  | 说明                                                                                             |
| -- | ----------------------------------- | ---------------------------------------------------------------------------------------------- |
| 前端框架 | Astro 7 静态生成                         | 源码 `site/`，构建产物 `site/dist/`；产品、新闻和多语言页面在构建期生成                                                                   |
| 服务端 | Cloudflare Pages Functions              | `/api/inquiry` 接收询盘；`/api/admin/*` 提供受保护的后台接口                                                        |
| 数据库 | Cloudflare D1                         | 询盘写入 `inquiries`；迁移位于 `migrations/0001_inquiries.sql` 和 `migrations/0002_admin_login_attempts.sql`                                                                   |
| 托管 | Cloudflare Pages（全球 CDN）         | 项目名 `dingdar`                                                                                  |
| 域名 | 注册在**阿里云**，NS 指向 Cloudflare         | **DNS 由用户手动在阿里云管理，任何 Agent 不得修改 DNS**                                                          |
| 询盘转发 | Formspree + Resend                     | Formspree 保留原有转发链路；Resend 可发送内部提醒和客户自动确认邮件 |
| 统计 | Google Analytics 4                  | 测量 ID `G-LVB325JZGL`（账号 a381915185 / 媒体资源 p521486701 / 数据流 16125796941）                        |
| 搜索 | Google Search Console               | 域名属性 `sc-domain:dingdar.com`，sitemap 已提交                                                       |
| 代码托管 | GitHub 私有仓库                          | `https://github.com/zhy2539/dingdar`（分支 main）                                  |
| 字体 | Merriweather（标题，OFL）+ Inter（正文，OFL） | 无版权纠纷                                                                                          |

## 3. 目录结构

```
E:\豆包工作内容存放\丁达尔建站\
├── README.md                  ← 本文档（交接入口，与 site\README.md 同内容）
├── 01-建站资产清单.md … 10-外链建设方案与发布内容.md   ← 历史交付文档（资产/关键词/地图/文案/表单/验收/诊断/SEO/外链）
├── _assets\                   ← 诊断脚本（verify_v2.py 等）与线上验证输出
└── site\                      ← 站点源码（Astro 项目，Git 仓库所在）
    ├── src\pages\             ← 页面（index / products / processes / news / about / faq / contact / request-sample / privacy / thank-you / 404 + [lang] 多语版）
    ├── src\components\        ← Header / Footer / PageHero / CtaBand / ProductCard / ModalContact（全局询盘弹窗）等
    ├── src\layouts\BaseLayout.astro  ← 全局布局（GA4、WhatsApp 浮动按钮、弹窗挂载）
    ├── src\data\config.ts     ← ★核心配置：公司事实、导航、Formspree 端点、GA ID、登记信息（改信息先改这里）
    ├── src\i18n\              ← 多语词典 dict-{es,fr,ru,pt}.ts + index.ts（getT / langPath / hreflangUrls）
    ├── public\                ← 静态资源（company-profile.pdf、llms.txt、robots、_redirects、图片）
    ├── astro.config.mjs       ← 站点地址、sitemap、301 重定向（/oem-casting→/about/#oem、/certifications→/about/#compliance）
    ├── _redirects             ← Cloudflare Pages 重定向（/resources/ → /about/ 301）
    └── package.json
```

## 4. 常用命令（在 `site\` 目录执行）

生产环境变量（仅在 Cloudflare Pages → Settings → Environment variables 配置，不写入仓库）：

- `ADMIN_PASSWORD`：后台登录密码
- `ADMIN_SECRET`：随机长字符串，用于签发管理 Cookie 和 IP 哈希；生产环境必填
- `DB`：Cloudflare D1 绑定变量
- `TURNSTILE_SECRET_KEY`：Turnstile 服务端密钥；启用 `REQUIRE_TURNSTILE=true` 时必填
- `TURNSTILE_FAIL_OPEN`：仅在明确接受验证码故障放行风险时设为 `true`，默认拒绝验证异常
- `RESEND_API_KEY`、`NOTIFY_EMAIL`、`NOTIFY_FROM`：Resend 通知链路配置
- `FORMSPREE_ENDPOINT`：可选，用于覆盖默认 Formspree 转发端点

数据库迁移：首次部署执行 `migrations/0001_inquiries.sql`；已有数据库升级时执行 `migrations/0002_admin_login_attempts.sql`，启用后台登录失败计数。

```
npm install                 # 首次/依赖变更后
npm run build               # 构建（产物 site\dist\）
python ..\_assets\verify_v2.py   # SEO 静态验收（在项目根目录执行）

# 如果使用当前仓库脚本，也可以运行
npm run verify                 # 构建 + sitemap/title/H1/canonical 等站点验证
```

部署（**已接入 GitHub 自动部署，push 即上线**，2026-10-15 配置）：

```
git add -A
git commit -m "说明"
git push          # 推到 GitHub main → Cloudflare Pages 自动构建部署 → 上线
```

> Cloudflare Pages 项目 `dingdar` 已连接 GitHub 仓库 `zhy2539/dingdar`（Production branch `main`，Build command `npm run build`，Output directory `dist`，Automatic deployments 开启）。**日常上线只走 git push，无需再手动 wrangler。**

wrangler 手动部署仅作紧急备选（需要 Cloudflare API Token 环境变量，见 §6）：

```
$env:CLOUDFLARE_API_TOKEN = "<你的 token>"
npx wrangler pages deploy dist --project-name=dingdar --branch=main --commit-dirty=true
```

> ⚠️ 接入 Git 后**勿再混用 wrangler 手动部署**（两者会互相覆盖，造成部署历史混乱）。只有 Git 链路故障时才临时用 wrangler 救急。

## 5. 页面与站点结构（当前状态）

* 导航（桌面 + 移动）：Home / Products / Processes / News / About / Contact / FAQ（Resources 已删除，内容并入 About 页「Supplier Resources / Company Profile」区块）

* 多语言（2026-10-14 上线）：全站 19 页 × 西/法/俄/葡四语，URL 前缀 `/es/` `/fr/` `/ru/` `/pt/`（英文保留根路径）；Header 右上角语言切换器；BaseLayout 自动输出 hreflang（en+四语+x-default）与 `og:locale`；sitemap 收录全部多语 URL。词条统一维护在 `site\src\i18n\dict-{es,fr,ru,pt}.ts`（4 部词典键集合一致）；`site\src\i18n\index.ts` 提供 `getT/langPath/hreflangUrls`。

* 已合并 / 删除的页面：
  * OEM Casting、Certifications 内容并入 `/about/`（锚点 `#oem`、`#compliance`）；旧 URL 301 到 About 锚点（noindex 壳页，勿删 astro.config.mjs 中的 redirects）
  * Resources 独立页已删除（2026-10-15），「公司档案 PDF 下载表单 + 内容清单 + 联系卡」并入 About 页（锚点 `#company-profile`，4 语言同步）；`_redirects` 将旧 `/resources/` 301 到 `/about/`

* 首页区块（参照 longxing.cn 版块节奏，深浅色交替）：Hero（全幅 banner，文字垂直居中、无底部信任行）→ 深色数据条（5 项实力数据，静态渲染不换行）→ 核心产品 → 企业实力（实景图 + 实力要点）→ 异议处理 → 合规验证 → Who We Work With（客户画像事实墙）→ 三步价值 → 材料工艺 → 行业应用（深色 Tabs 切换）→ 流程 → FAQ → 底部 CTA。首页 hero 使用真实车间大齿圈图（`/images/factory-gear-ring-full.webp`，齿圈完整显示）。

* 询盘触点（全站）：导航 Contact 页表单 + 全局询盘**弹窗**（任意 `data-modal-open` 按钮触发，如各页 Hero/CTA 按钮）+ 产品页 "Discuss Your Part" + 右下角 WhatsApp 浮动按钮 + 页脚邮箱 / WhatsApp

* 全局弹窗：`src/components/ModalContact.astro`，复用 Formspree 端点，含必填校验、honeypot 防垃圾、成功跳 `/thank-you/`、触发 GA 事件 `inquiry_submitted`

## 6. 账号与敏感信息（只读引用，勿外泄、勿写进代码 / 仓库）

| 项                    | 值 / 说明                                                                                                                                                                |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Cloudflare API Token | **不在本 README 中**。现有 Token 仅 Pages 权限、**绑定本机 IP**；换电脑 / 换网络后需用户重新创建（创建时 "客户端 IP 地址过滤" 下拉选 **Allow** 并填当前 IP，否则无法通过审核）。Token 用环境变量注入部署命令，**严禁写入代码或提交 git** |
| Formspree            | 通知邮箱保持 gmail（用户曾要求改 zhy2539@126.com，自动化操作失败后已叫停 ——**勿重试改邮箱**，如需要由用户在 Formspree 后台手动改）                                                                                 |
| 邮箱 / 触点              | 全站统一 `hugo@dingdar.com`（sales/engineering/quality 三个触点均指向该邮箱，改邮箱只改 `site\src\data\config.ts`）；WhatsApp +86 19337861987（链接必须带 +：`https://wa.me/+8619337861987`）                                  |
| GA4 事件               | whatsapp_click / inquiry_submitted / sample_requested / profile_downloaded（已在代码埋点，可在 GA4 后台标为关键事件）                                                                    |
| 可用部署方式               | ① **Git 自动部署（推荐）**：`git push` 到 GitHub main，Cloudflare Pages 自动构建上线，无需任何 Token；② wrangler 手动（备选，需 Token，接入 Git 后勿混用）；③ 用户浏览器登录 Cloudflare 后台 UI 操作（DNS 操作只能走 UI，Token 无 DNS 权限，会 403）                                                                            |

## 7. 合规红线（最重要，任何 Agent 必须遵守）

1. **不得虚构**：企业认证证书、客户案例 / Logo / 评价、数据、URL 一律不得编造。

2. **登记信息展示边界**：仅允许展示公开登记信息 —— 统一社会信用代码 `91410329MADUMDDKX4`、登记状态 Active（存续）、登记机关伊川县市场监督管理局、"Verify it yourself" 两个验证链接（企查查公开页 + 国家企业信用信息公示系统 [gsxt.gov.cn](https://gsxt.gov.cn)）。**不得**展示法定代表人 / 注册资本 / 注册地址等敏感字段，不放营业执照图片。

3. **证书表述**：公司目前无 ISO/CE 证书可展示；合规表述统一为 "材料 / 检验记录随单，按项目需求在评审中确认可提供的标准文档（ISO/ASTM/DIN/GB 系列）"。后续取得真实证书再升级为 "编号 + 有效期 + 官方验证链接"。

4. **公司定位**：对外表述为铸造生产型企业（integrated foundry），可用 workshop / production base / manufacturing partner；不得把不实信息写成工厂虚构。

5. **面向海外买家的正文用自然商务英语**，中文仅作审阅说明；不做关键词堆砌、隐藏文本、买链接、抄袭。

6. **完成措辞分级**：文件写入 ≠ 构建成功 ≠ git 提交 ≠ 已推送 ≠ 已上线。上线 = 部署成功 + 线上 URL 内容级复验（核对关键标记，不能只看 HTTP 200）。

7. **高影响动作先确认**：购买域名、开通付费服务、修改 DNS、真实提交表单、发送邮件、推送线上、发布内容、创建定时任务、删除文件、批量操作外部账号 —— 执行前须获得用户确认。

## 8. Git 版本管理

> ⚠️ **给其他 Agent（Accio Work 等）的重要提示 — 先读这里**
>
> **Git 仓库根在 `site\` 子目录**（`.git` 文件夹位于 `site\.git`），**项目根目录 `E:\豆包工作内容存放\丁达尔建站\` 本身不是 Git 仓库**。在项目根执行 `git` 会报「不是 Git 仓库」——请先把工作目录切换到 `site\` 再执行所有 git 操作：
>
> ```
> cd E:\豆包工作内容存放\丁达尔建站\site
> git status      # 查看改动
> git add -A && git commit -m "说明"
> git push        # 推 GitHub main → 自动部署上线
> ```
>
> - **代理依赖**：本机 push 依赖 `site\.git\config` 中配置的仓库级代理 `http://127.0.0.1:7897`（仅本仓库，勿删除、勿改全局）。若 push 失败，先 `Test-NetConnection 127.0.0.1:7897` 确认代理存活，再重新 push。
> - **运营文档不入库**：项目根的 `01-建站资产清单.md … 11-询盘录入规范.md` 及项目根 README 属于**本地存档**，不纳入 git。如需把文档纳入版本管理，统一放入 `site\docs\` 目录再提交。

* 仓库位于 `site\`（分支 `main`），仓库级身份 DINGDAR [sales@hndingdar.com](mailto:sales@hndingdar.com)（仅本仓库设置，勿动全局 git 配置）

* 远程：`origin` = `https://github.com/zhy2539/dingdar`（**私有仓库**，2026-10-15 创建并推送，本地与远程完全同步）

* 近期提交（倒序）：`e3b3093` 合并 resources 到 About（新增 Supplier Resources 区块 + 删除独立页 + _redirects 301）→ `3a67669` About 数据卡不换行 → `34df0c2` 站内权威外链（ASTM/ISO/AFS/MatWeb + 文章内链）→ `45cf380` 移动端 Header 修复 → `046de93` About 移除数据统计面板 → …（完整历史在 `git log`）

* 推送流程：`git push` 同时完成「同步 GitHub 私有仓库」+「触发 Cloudflare 自动部署上线」（2026-10-15 起）。部署完成后远程与本地保持同步

* `.gitignore` 已排除 node_modules / dist / .astro / .wrangler / .env 等（敏感信息不会上传）

## 9. 已接入并验证的链路

* [x] dingdar.com + www 绑定 Cloudflare Pages，HTTPS 签发生效
* [x] GSC 域名属性验证通过，sitemap 已提交（`https://dingdar.com/sitemap-index.xml`，子地图 sitemap-0.xml；GSC 只接受完整绝对 URL）
* [x] GA4 接入（G-LVB325JZGL），gtag 已部署
* [x] Formspree 端点 Active，曾真实收信测试成功（通知 gmail）
* [x] 询盘弹窗全站生效（浏览器实测打开 / 关闭正常）
* [x] 随机不存在路径 / 图片返回 404（无 Soft 404）
* [x] SEO 静态验收 0 问题（126 页构建通过；多语 title 按 70 字符口径验收）
* [x] GitHub 私有仓库备份（全部历史提交已推送）
* [x] **Cloudflare Pages 已连接 GitHub（zhy2539/dingdar）**：Production branch `main` / Build `npm run build` / Output `dist` / 自动部署开启；`git push` 即自动构建上线（已实测一次自动部署成功）

## 10. 交接给新 Agent 的必读顺序

1. 本 README（尤其 §6、§7）
2. `site\src\data\config.ts`（公司事实与配置的唯一事实源）
3. `site\astro.config.mjs`（站点地址 / 重定向）+ `site\public\_redirects`
4. `06-上线交付报告.md`（完整验收与变更历史）
5. 改代码前先 `Read` 目标文件，构建后跑 `verify_v2.py`，发布后做线上内容级复验

## 11. 运营数据记录（建议）

建议用**飞书多维表格**建一个「DINGDAR 运营台账」（或本地 Excel），三张表：

| 表 | 字段 | 更新频率 |
| -- | -- | -- |
| 询盘台账 | 日期 / 来源渠道 / 姓名 / 公司 / 国家 / 产品意向 / 数量 / 联系方式 / 状态（新询盘→跟进中→已报价→成交/流失）/ 备注 | 每次收到询盘后当天 |
| SEO 周报 | 周次 / GSC 点击 / 展示 / 平均排名 / 收录数 / GA4 会话 / 询盘提交数 / 关键事件数 | 每周一 |
| 内容排期 | 计划发布日期 / 文章主题 / 目标关键词 / 对应页面 / 状态 | 每周 |

跟进节奏：未回复客户按第 3 / 7 / 14 天分别用「补充资料 → 案例背书 → 时效理由」跟进（话术见 `10-外链建设方案与发布内容.md` 及历史交付的 3 套回复模板）。

## 12. 已知注意事项（踩过的坑，勿重蹈）

* Formspree 通知邮箱自动化改动**不可行**（react-select 控件无法自动化），改邮箱只能用户手动后台操作
* Product Schema 使用非价格增强方案：报价制页面不虚构 `price`、`offers`、`review` 或 `aggregateRating`；页面通过 Service/Product 业务标记、真实图片和 `additionalProperty` 表达材料、工艺与部件类型。GSC 中遗留的旧产品报告需等待重新抓取后再复核。
* 询盘 API 在生产环境要求 `ADMIN_SECRET`；后台登录失败计数依赖 `migrations/0002_admin_login_attempts.sql`，Cloudflare WAF/Rate Limiting 仍建议作为边缘层补充防护。
* wrangler login OAuth 登录**不可用**（此前多次超时），部署一律用 API Token 环境变量
* Cloudflare API Token 无 DNS 权限，DNS 操作走浏览器 UI
* GSC sitemap 提交只接受完整绝对 URL，相对路径 / 斜杠形式报 "地址无效"
* GA4 后台 Angular 表单自动化不同步，如确需操作由用户手动完成
* 页面改造注意同步：导航（config.ts NAV）、页脚（Footer.astro）、sitemap（自动）、llms.txt（手动，public/llms.txt）、老 URL 重定向（astro.config.mjs / _redirects）
* 共享组件（Header/Footer/BaseLayout/ModalContact）改动会波及全站，验收时至少检查首页、产品页、About、Contact
* 首页版块组件改动必须英文首页 `index.astro` 与多语首页 `[lang]\index.astro` 双端同步；首页新增文案一律走词典
* 多语言改动后必须同时检查：4 部词典键集合一致（可跑 `_assets\i18n_dyn_verify.py`）、`[lang]` 模板键引用存在、构建后抽查至少 1 个非英文页的 hreflang/canonical/翻译内容，再跑 verify_v2.py 验收
* 非英文语言 title 天然较长，SEO 验收口径为 ≤70 字符（英文仍 ≤60），对应规则已写进 `verify_v2.py`，勿手动回退
* 巡检工具：本机 curl 直连外网不稳定，页面巡检用浏览器工具（Playwright MCP 偶发不可用时改用 Aha Browser Use 的 http_get 判断 200/404）
* 其他 Agent 若在**项目根**执行 git 会报「不是 Git 仓库」——仓库在 `site\`，先切工作目录到 `site\` 再操作（详见 §8 顶部提示）
