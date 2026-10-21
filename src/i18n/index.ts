// i18n 基础：语言定义、词典导入与取词工具
// 页面模板统一用 t('path.to.key') 从当前语言词典取词；英文根路径页面保留原文。
import { es } from './dict-es';
import { fr } from './dict-fr';
import { ru } from './dict-ru';
import { pt } from './dict-pt';

export type Lang = 'es' | 'fr' | 'ru' | 'pt';
export type AnyLang = Lang | 'en';

export const LANG_CODES: Lang[] = ['es', 'fr', 'ru', 'pt'];

export const LANGS: { code: Lang; label: string }[] = [
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'ru', label: 'Русский' },
  { code: 'pt', label: 'Português' },
];

export type Dict = Record<string, string>;

export const dicts: Record<Lang, Dict> = { es, fr, ru, pt };

// 按点分路径取词；缺失时返回空串（构建期即暴露遗漏）
export function pick(dict: Dict, path: string): string {
  return dict[path] !== undefined ? dict[path] : '';
}

// 语言取词工厂：t('key') 返回当前语言词典值；英文页面直接用原文，不调用
export function getT(lang: Lang): (key: string) => string {
  const dict = dicts[lang];
  return (key: string) => (dict[key] !== undefined ? dict[key] : '');
}

// 语言化路径：英文 '/contact/' → '/es/contact/'；首页 '/' → '/es/'
export function langPath(lang: Lang, enPath: string): string {
  const base = lang === 'en' ? '' : '/' + lang;
  if (enPath === '/' || enPath === '') return base === '' ? '/' : base + '/';
  return base + enPath;
}

// 各语言页面 URL（用于 hreflang），en 为首项
export function hreflangUrls(enPath: string): { code: AnyLang; url: string }[] {
  const urls: { code: AnyLang; url: string }[] = [
    { code: 'en', url: langPath('en' as Lang, enPath) },
  ];
  for (const c of LANG_CODES) {
    urls.push({ code: c, url: langPath(c, enPath) });
  }
  return urls;
}

// Only advertise localized article URLs when every visible article field is translated.
// This prevents blank or partial article pages from being generated and linked as alternates.
export function hasNewsTranslation(lang: Lang, articleIndex: number, paragraphCount: number): boolean {
  const dict = dicts[lang];
  const prefix = `nw.a${articleIndex}.`;
  const requiredKeys = [
    'title',
    'excerpt',
    ...Array.from({ length: paragraphCount }, (_, index) => `b${index}`),
  ];

  return requiredKeys.every((key) => {
    const value = dict[prefix + key];
    return typeof value === 'string' && value.trim().length > 0;
  });
}

export function newsTranslationLangs(articleIndex: number, paragraphCount: number): AnyLang[] {
  return [
    'en',
    ...LANG_CODES.filter((lang) => hasNewsTranslation(lang, articleIndex, paragraphCount)),
  ];
}

// og:locale 映射
export const OG_LOCALES: Record<AnyLang, string> = {
  en: 'en_US',
  es: 'es_ES',
  fr: 'fr_FR',
  ru: 'ru_RU',
  pt: 'pt_PT',
};

// HTML lang 属性
export const HTML_LANGS: Record<AnyLang, string> = {
  en: 'en',
  es: 'es',
  fr: 'fr',
  ru: 'ru',
  pt: 'pt',
};
