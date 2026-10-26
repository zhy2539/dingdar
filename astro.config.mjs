// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://dingdar.com',
  compressHTML: true,
  trailingSlash: 'ignore',
  redirects: {
    '/oem-casting': '/about/#oem',
    '/certifications': '/about/#compliance',
  },
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/thank-you/') &&
        !page.includes('/admin/') &&
        !page.includes('/oem-casting') &&
        !page.includes('/certifications'),
    }),
  ],
});
