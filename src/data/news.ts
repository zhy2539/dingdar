// 新闻/动态数据：slug、标题、日期、摘要、封面、正文段落
// 仅收录可核实的真实公司动态；新内容由运营团队在发布时补充，不虚构事件。
export interface NewsItem {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  cover: string;
  coverAlt: string;
  body: string[];
}

export const NEWS: NewsItem[] = [
  {
    slug: 'dingdar-launches-international-website',
    title: 'DINGDAR Launches Its International Website',
    date: '2026-10-14',
    excerpt:
      'Our new English website is now live. Buyers of crusher wear parts, bucket teeth and custom castings can send drawings, part numbers or samples directly for a technical review and quotation.',
    cover: '/images/foundry-pouring.webp',
    coverAlt: 'Molten metal pouring in the DINGDAR foundry',
    body: [
      'Henan Dingdar Machinery Equipment Manufacture Co., Ltd. has launched its international website at dingdar.com to make it easier for overseas buyers to start a casting project. The site covers the full product range — jaw crusher wear parts, cone crusher wear parts, impact crusher blow bars, hammer heads, double roll crusher parts, bucket teeth and adapters, and custom castings produced to drawing or sample.',
      'Every inquiry is reviewed as a technical requirement: geometry, material, casting process and inspection scope are confirmed before price and delivery are quoted. Buyers can start with a drawing, a 3D model, a part number, or simply a photo of the worn part.',
      'Inquiries can be submitted through the contact form on the website, by email to sales@hndingdar.com, or via WhatsApp at +86 19337861987. The project team aims to reply with technical feedback within 12–24 hours.',
      'The site also explains our four in-house casting routes — green sand, shell moulding, lost foam and investment casting — and the material families used across wear parts and custom components, based on over 40 years of casting experience since 1986.',
    ],
  },
];

export const getNews = (slug: string) => NEWS.find((n) => n.slug === slug);
