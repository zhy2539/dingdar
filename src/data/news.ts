// 新闻/动态数据。
// 数据体存放在 news.json —— Pages CMS 可直接编辑，构建时类型化。
// body 中每一项是一条内容块，支持 Markdown（也可直接写 HTML，构建时会原样保留）。
// 多语种译文按「文章序号 + 段落数」匹配（见 i18n/hasNewsTranslation），
// 所以新增文章请追加到数组末尾，不要调整既有文章的顺序。
import raw from './news.json';

export interface NewsItem {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  cover: string;
  coverAlt: string;
  body: string[];
  /** 同主题的其它文章 slug，用于文章间互链（不指向自身） */
  related?: string[];
  /**
   * 搜索结果里显示的摘要。excerpt 是给人读的导语，通常偏长（200 字以上），
   * 直接当 meta description 会被 Google 截断，所以这里单独写一版 150–160 字符的。
   * 不填则回落到 excerpt。
   */
  metaDescription?: string;
  /** 指向非产品分类页的补充内链，例如能力页 /ball-mill-liners/ */
  relatedPages?: { href: string; label: string }[];
}

export const NEWS = raw as NewsItem[];

export const getNews = (slug: string) => NEWS.find((n) => n.slug === slug);
