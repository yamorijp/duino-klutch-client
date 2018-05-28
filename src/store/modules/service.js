import Vue from 'vue'
import ls from 'local-storage'
import {api} from '../../api/client'

let socket = null

const state = {
  status: 'loading', // loading|unavailable|ok
  config: {
    host: 'duino-k.local',
    label: 'My Room #1',
    httpPort: '80',
    wsPort: '81'
  },
  handlers: [
    // {
    //   group: 'sensor,
    //   name: 'cds',
    //   type: 'AnalogSensor',
    //   resource: '/sensor/brightness'
    // },...
  ],
  resources: {
    // '/sensor/brightness: {
    //   value: 482
    // },...
  }
}

const getters = {
  handlers: (state) => (group) => {
    return state.handlers.filter(item => item.group === group)
  },
  sensorHandlers (state, getters) {
    return getters.handlers('sensor')
  },
  switchHandlers (state, getters) {
    return getters.handlers('switch')
  },
  ledHandlers (state, getters) {
    return getters.handlers('led')
  },
  irHandlers (state, getters) {
    return getters.handlers('ir')
  }
}

const actions = {

  updateResources (context, data) {
    const items = data.resource === '*' ? data.items : [data]
    context.commit('resources', items)
  },

  initialize (context) {
    const config = ls.get('duino-k.service.config') || {}
    context.commit('config', config)
  },

  saveConfig (context, config) {
    context.commit('config', config)
  },

  async connect (context) {
    context.commit('status', 'loading')

    // fetch handler config
    try {
      const data = await api('/_handlers')
      context.commit('handlers', data.items)
    } catch (e) {
      context.commit('status', 'unavailable')
      return
    }

    // connect to web-socket
    socket = new WebSocket('ws://' + context.state.config.host + ':' + context.state.config.wsPort)
    socket.onmessage = event => {
      const data = JSON.parse(event.data)
      if (data.event === 'update' || data.event === 'init') {
        context.dispatch('updateResources', data)
      }
    }
    socket.onerror = event => {
      console.error(event)
    }
    socket.onclose = event => {
      context.commit('status', 'unavailable')
      socket = null
    }
    socket.onopen = event => {
      context.commit('status', 'ok')
    }
  },

  async disconnect (context) {
    return new Promise((resolve, reject) => {
      if (socket) {
        socket.onclose = _ => {
          socket = null
          resolve()
        }
        socket.close()
      } else {
        resolve()
      }
    })
  }
}

const mutations = {

  status (state, status) {
    state.status = status
  },

  resources (state, items) {
    items
      .filter(item => item.resource && item.data)
      .forEach(item => {
        if (!state.resources[item.resource]) {
          // 監視対象としてプロパティを追加
          Vue.set(state.resources, item.resource, item.data)
        } else {
          state.resources[item.resource] = item.data
        }
      })
  },

  handlers (state, items) {
    state.handlers = items
  },

  config (state, config) {
    Object.assign(state.config, config)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
