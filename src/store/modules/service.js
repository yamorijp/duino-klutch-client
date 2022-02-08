import Vue from 'vue'
import ls from 'local-storage'
import {api} from '../../api/client'

const defaultServers = [
  {
    label: 'My Room #1',
    host: 'duino-k.local',
    httpPort: '80',
    wsPort: '81',
    secure: false,
    cover: ''
  },
  {
    label: 'Bedroom #1',
    host: 'duino-h.local',
    wsPort: '81',
    secure: false,
    cover: ''
  },
  {
    label: 'Demo Server #1',
    host: 'duino-k.herokuapp.com',
    httpPort: '443',
    wsPort: '443',
    secure: true,
    cover: ''
  }
]

let socket = null

const state = {
  status: 'loading', // loading|unavailable|ok
  config: {
    host: 'duino-k.local',
    label: 'My Room #1',
    httpPort: '80',
    wsPort: '81',
    secure: false,
    cover: ''
  },
  servers: [
    // {
    //   host: 'duino-k.local',
    //   label: 'My Room #1',
    //   httpPort: '80',
    //   wsPort: '81'
    // },
  ],
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
  },
  requesting: false
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
  },
  deviceHandlers (state, getters) {
    return getters.handlers('device')
  },
  server: (state) => (key) => {
    const s = state.servers.find(item => item.label === key)
    return s || {label: key, host: '', httpPort: '80', wsPort: '81', secure: false}
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

    const servers = ls.get('duino-k.service.servers') || defaultServers
    context.commit('servers', servers)
  },

  updateCover (context) {
    if (context.state.config.cover) {
      document.body.style.backgroundImage = `url(${context.state.config.cover})`
    } else {
      document.body.style.backgroundImage = null
    }
  },

  saveConfig (context, config) {
    context.dispatch('addServer', config)
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
    const proto = context.state.config.secure ? 'wss' : 'ws'
    socket = new WebSocket(proto + '://' + context.state.config.host + ':' + context.state.config.wsPort)
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
  },

  addServer (context, server) {
    const servers = context.state.servers
      .filter(item => item.label !== server.label)
      .concat({...server})
    context.commit('servers', servers)
  },

  deleteServer (context, label) {
    const servers = context.state.servers
      .filter(item => item.label !== label)
    context.commit('servers', servers)
  }
}

const mutations = {

  servers (state, servers) {
    state.servers = servers
  },

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
  },

  requesting (state, b) {
    state.requesting = b
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
