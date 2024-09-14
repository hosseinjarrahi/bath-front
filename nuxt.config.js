// const domain = 'https://api.add-app.ir/'
const websocketDomain = 'wss://socket.add-app.ir/'


// const domain = 'http://bandar-api.test/'
const domain = 'http://127.0.0.1:8000/'
// const domain = 'http://185.145.187.250:8080/'
// const domain = 'http://46.148.36.110:8080/'

// local
// const domain = 'http://172.16.150.2:8080/'
// const websocketDomain = 'ws://172.16.150.2:3232/'

export default {
  ssr: false,

  loadingIndicator: '~/static/html/loading.html',

  head: {
    title: 'سامانه آفتاب درخشان',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'shortcut icon', type: 'image/x-icon', href: '/icon.svg' },
      { rel: 'icon', type: 'image/x-icon', href: '/icon.svg' },
    ],
  },

  css: [
    '@/static/css/main.css',
    '@/static/fonts/IRANSans/css/style.css',
    '@/static/fonts/fontawesome/6/css/all.css',
    '@static/css/btn.css',
    '@static/css/fafa-style.css',
  ],

  plugins: [
    {
      src: '@/plugins/vuetify',
      ssr: false,
    },
    {
      src: '@/plugins/vue-gates',
      ssr: false,
    },
    {
      src: '@/plugins/majra',
      ssr: false,
    },
    {
      src: '@/plugins/apexcharts',
    },
  ],

  components: true,

  modules: ['@nuxtjs/axios', '@nuxtjs/auth', 'nuxt-leaflet'],

  buildModules: ['@nuxtjs/pwa'],

  axios: {
    baseURL: domain + 'api',
  },

  env: {
    websocketDomain,
    baseURL: domain,
    uploadPath: domain + 'api/upload-file',
    posCallbackUrl: domain + 'api/callback',
  },

  server: {
    port: 3232,
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/login',
            method: 'post',
            propertyName: 'access_token',
          },
          logout: {
            url: '/logout',
            method: 'post',
          },
          user: false,
          refresh: {
            url: '/refresh',
            method: 'post',
            propertyName: 'access_token',
          },
        },
        token: {
          maxAge: 60 * 60,
        },
        refreshToken: {
          maxAge: 20160 * 60,
        },
        autoFetchUser: false,
      },
    },
    redirect: {
      login: '/',
      home: '/admin/dashboard',
    },
  },

  router: {
    trailingSlash: false,
  },
}
