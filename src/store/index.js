import Vue from 'vue'
import Vuex from 'vuex'
import service from './modules/service'
import {setHost} from '../api/client'

import ls from 'local-storage'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    service
  },
  strict: debug,
  plugins: debug ? [] : []
})

store.subscribe(async (mutation, state) => {
  if (mutation.type === 'config') {
    setHost(state.service.config.host, state.service.config.httpPort)
    try {
      ls.set('duino-k.service.config', state.service.config)
      await store.dispatch('disconnect')
      await store.dispatch('connect')
    } catch (e) {
      console.error(e)
    }
  }
})

export default store
