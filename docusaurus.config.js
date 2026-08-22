/** @format */

// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: "TKUITOCC 淡江大學資訊科技及開放文化社群",
    tagline: "Tamkang University Information Technology and Open Culture Community",
    favicon: "https://tkuitocc.github.io/favicon.png",

    // Set the production url of your site here
    url: "https://tkuitocc.github.io",
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: "/docs/",

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: "tkuitocc", // Usually your GitHub org/user name.
    trailingSlash: false,
    projectName: "docs", // Usually your repo name.
    deploymentBranch:"gh-pages",

    onBrokenLinks: "throw",

    markdown: {
        mermaid: true,
        hooks: {
            onBrokenMarkdownLinks: "warn",
        },
    },

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: "zh-Hant",
        locales: [
            "zh-Hant"
        ],
        localeConfigs: {
            "zh-Hant": {
                htmlLang: "zh-Hant-TW",
            },
        },
    },

    presets: [
        [
            "classic",
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    sidebarPath: "./sidebars.js",
                    routeBasePath: '/',
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl: "https://github.com/tkuitocc/docs/blob/main/",
                },
                blog: {
                    showReadingTime: true,
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl: "https://github.com/tkuitocc/docs/blob/main/",
                },
                theme: {
                    customCss: "./src/css/custom.css",
                },
            }),
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            // Replace with your project's social card
            image: "img/TKUITOCC_social-card.png",
            navbar: {
                title: "TKUITOCC 淡江大學資訊科技及開放文化社群",
                logo: {
                    alt: "TKUITOCC logo",
                    src: "https://github.com/tkuitocc.png",
                },
                items: [
                    {
                        to: "/",
                        label: "官方網站",
                        position: "left",
                    },
                    {
                        type: "docSidebar",
                        sidebarId: "tutorialSidebar",
                        position: "left",
                        label: "說明文件",
                    },
                    {
                        to: "/blog",
                        label: "部落格",
                        position: "left",
                    },
                    {
                        to: "/docs/project/status",
                        label: "專案狀態",
                        position: "left",
                    },
                    {
                        href: "https://github.com/tkuitocc/docs",
                        label: "GitHub",
                        position: "right",
                    },
                ],
            },
            footer: {
                links: [
                    {
                        title: "探索更多",
                        items: [
                            {
                                label: "官方網站",
                                to: "/docs/",
                            },
                            {
                                label: "說明文件",
                                to: "/docs/intro",
                            },
                            {
                                label: "部落格",
                                to: "/docs/blog/",
                            },
                            {
                                label: "GitHub",
                                to: "https://github.com/tkuitocc",
                            },
                            {
                                label: "TKU Wiki 淡江人共筆網",
                                to: "https://tku.miraheze.org/wiki/zh-Hant/首頁",
                            },
                            {
                                label: "Dauphin iOS應用程式",
                                to: "https://testflight.apple.com/join/D3K3B9pX",
                            },
                        ],
                    },
                    {
                        title: "聯絡我們",
                        items: [
                            {
                                label: "電子郵件",
                                href: "mailto:tkuitocc@gmail.com",
                            },
                            {
                                label: "Discord",
                                href: "https://discord.com/invite/XQY8K3nz2a",
                            },
                            {
                                label: "Telegram",
                                href: "https://t.me/TKUOSC",
                            },
                        ],
                    },
                    {
                        title: "關注我們",
                        items: [
                            {
                                label: "LinkedIn",
                                href: "https://www.linkedin.com/company/tkuitocc",
                            },
                            {
                                label: "Facebook",
                                href: "https://www.facebook.com/tkuitocc",
                            },
                            {
                                label: "Instagram",
                                href: "https://www.instagram.com/tkuitocc",
                            },
                            {
                                label: "Threads",
                                href: "https://www.threads.com/@tkuitocc",
                            },
                        ],
                    },
                ],
                copyright: `Copyright © 2024-${new Date().getFullYear()} TKUITOCC.<br />Community content is available under the Creative Commons Zero v1.0 Universal (CC0) license; additional terms may apply.<br />Built with Docusaurus.`,
            },
            prism: {
                theme: prismThemes.github,
                darkTheme: prismThemes.dracula,
            },
            colorMode: {
                defaultMode: 'dark',
                disableSwitch: false, // Set to true to disable the theme switcher
                respectPrefersColorScheme: true,
            },
        }),
    themes: ['@docusaurus/theme-mermaid'],
};

export default config;
