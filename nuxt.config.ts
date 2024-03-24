// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL,
      wsUrl: process.env.NUXT_PUBLIC_WS_URL,
    },
  },
  app: {
    head: {
      title: 'NEFA',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        // Buraya Poppins yazı tipi için link etiketini ekleyeceğiz
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap',
        },
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.0.0/css/flag-icons.min.css',
        },
      ],
      script: [
        {
          src: 'https://polyfill-fastly.io/v3/polyfill.min.js?features=Intl.NumberFormat,Intl.NumberFormat.~locale.en',
        },
      ],
    },
  },
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ['@nuxt/image', '@nuxtjs/i18n', 'nuxt-aos'],
  i18n: {
    locales: [
      {
        code: 'en',
        name: 'English',
        file: 'en.json',
        flag: 'gb',
      },
      {
        code: 'tr',
        name: 'Türkçe',
        file: 'tr.json',
        flag: 'tr',
      },
      {
        code: 'de',
        name: 'Deutsche',
        file: 'de.json',
        flag: 'de',
      },
    ],
    lazy: true,
    langDir: 'i18n',
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'lang',
    },
  },
})
