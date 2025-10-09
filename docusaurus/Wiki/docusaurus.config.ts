import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import * as tslib_1 from  "tslib";
const lodash_1 = tslib_1.__importDefault(require("lodash"));

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)
const url = process.env.SERVER_NAME ? 'https://wiki.' + process.env.SERVER_NAME : 'https://wiki.abel-brien.localhost';
const personal_website_url = process.env.SERVER_NAME ? 'https://' + process.env.SERVER_NAME : 'https://abel-brien.localhost';

const config: Config = {
  title: 'Wiki Abel',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: url,
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'aboul', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          async sidebarItemsGenerator({
            defaultSidebarItemsGenerator,
            docs,
            ...args
          }) {
            return defaultSidebarItemsGenerator({
              docs: docs.map(function (doc, index) {
                const deslugify = (str: string) => lodash_1.default.startCase(str.replace(/-/g, " "));

                let newFrontMatter = {};
                const title = doc.id.split('/').pop();

                if (title) {
                  doc.title = deslugify(title);
                  newFrontMatter = { ...newFrontMatter, 'sidebar_label': doc.title };
                }
                
                doc.frontMatter = { ...doc.frontMatter, ...newFrontMatter };
                //console.log(doc);
                return doc;
              }),
              ...args,

            })
        },
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        // ... Your options.
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,
        language: ["en", "fr"],
        docsRouteBasePath: '/',
        indexBlog: false,
        indexDocs: true,
        highlightSearchTermsOnTargetPage: true,

        // Customize the keyboard shortcut to focus search bar (default is "mod+k"):
        // searchBarShortcutKeymap: "s", // Use 'S' key
        // searchBarShortcutKeymap: "ctrl+shift+f", // Use Ctrl+Shift+F

        // If you're using `noIndex: true`, set `forceIgnoreNoIndex` to enable local index:
        // forceIgnoreNoIndex: true,
      } satisfies import("@easyops-cn/docusaurus-search-local").PluginOptions,
    ]
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    navbar: {
      items: [
        {
          type: 'search',
          position: 'right',
        },
        {
          href: "https://github.com/aboul",
          position: "right",
          className: "header--github-link",
          "aria-label": "GitHub repository",
        
        },
        {
          href: "https://linkedin.com/in/abelbrien",
          position: "right",
          className: "header--linkedin-link",
          "aria-label": "Linkedin profile",
        
        },
      ],
      title: 'Wiki Abel',
      logo: {
        alt: 'Wiki Abel Logo',
        src: 'img/favicon.svg',
      }
    },
    footer: {
      style: 'dark',
      links: [
        // {
        //   title: 'Docs',
        //   items: [
        //     {
        //       label: 'Tutorial',
        //       to: '/',
        //     },
        //   ],
        // },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/aboul',
            },
            {
              label: 'Linkedin',
              href: 'https://linkedin.com/in/abelbrien'
            },
            {
              label: 'Personal Website',
              href: personal_website_url
            }
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Wiki Abel, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
