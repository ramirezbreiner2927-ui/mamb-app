// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'MAMB Digital',
  tagline: 'Museo de Arte Moderno de Barranquilla',
  favicon: 'img/favicon.ico',
  future: {
    v4: true,
  },
  url: 'https://ramirezbreiner2927-ui.github.io',
  baseUrl: '/mamb-app/',
  organizationName: 'ramirezbreiner2927-ui',
  projectName: 'mamb-app',
  onBrokenLinks: 'throw',
  i18n: {
    defaultLocale: 'es',
    locales: ['es'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],
  themeConfig:
    ({
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'MAMB Digital',
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'mambSidebar',
            position: 'left',
            label: 'Documentación',
          },
          {
            href: 'https://mambapp.online',
            label: 'Ver sitio',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Proyecto',
            items: [
              {
                label: 'Sitio web',
                href: 'https://mambapp.online',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/ramirezbreiner2927-ui/mamb-app',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} MAMB Digital — Universidad Simón Bolívar, Barranquilla.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};
export default config;
