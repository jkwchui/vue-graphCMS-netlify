import Vue from 'vue'
import App from './App.vue'

import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
// import router from './router.js'

const GRAPHCMS_API = 'https://api.graphcms.com/simple/v1/graphCMSchem'

const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: GRAPHCMS_API }),
  cache: new InMemoryCache()
})

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

new Vue({
  el: '#app',
  apolloProvider,
  render: h => h(App)
})
