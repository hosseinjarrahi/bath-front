import Vue from 'vue'
import Majra from 'majra'

export default ({store, $axios}) => {
  $axios.defaults.headers.common['X-Database-Connection'] = localStorage.getItem('bath')

  Vue.use(Majra, {
    store,
    configs: {
      FILTER_URL: process.env.baseURL + 'api/filter',
      BASE_URL: process.env.baseURL,
      axios: {
        instance: $axios,
      },
    },
  })
}
