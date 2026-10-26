// 产品目录数据：7 个产品分类。
// 数据体存放在 products.json —— 这样 Pages CMS 可以直接编辑，构建时再类型化。
// 新增/修改分类请改 products.json，本文件只负责类型与查询函数。
import raw from './products.json';

export interface Part {
  code: string;
  name: string;
  img: string;
}

export interface Category {
  slug: string;
  title: string;
  shortName: string;
  cardTitle: string;
  cardDesc: string;
  heroImg: string;
  bannerImg: string;
  h1: string;
  intro: string;
  parts: Part[];
  applications: string[];
  selection: { q: string; a: string }[];
  specs: string[];
}

export const CATEGORIES = raw as Category[];

export const getCategory = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
