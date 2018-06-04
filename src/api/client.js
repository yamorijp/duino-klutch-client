import axios from 'axios'

let baseUrl = ''

export function setHost (host, port = 80) {
  baseUrl = 'http://' + host + ':' + port
}

function snakeToTitle (str) {
  return str.split('_')
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ')
}

export class ApiError {
  constructor (type, code, message) {
    this.type = type
    this.code = code
    this.message = message
  }

  getMessage () {
    return this.message
  }

  toString () {
    return this.message
  }
}

export class ApiFail extends ApiError {
  constructor (type, code, data = {}) {
    super(type, code, '')
    this.data = data
    this.message = this.getMessage()
  }

  getMessage () {
    return Object.keys(this.data)
      .map(key => snakeToTitle(key) + ' ' + this.data[key])
      .join(' / ')
      .trim()
  }
}

export default async function client (vue, resource, params = {}, discreet = false) {
  vue.$store.commit('requesting', true)
  try {
    const data = await api(resource, params)
    if (!discreet) {
      vue.$message({
        message: 'Success',
        type: 'success',
        showClose: true,
        duration: 1500
      })
    }
    return data
  } catch (e) {
    vue.$message({
      message: e + '',
      type: e.type === 'fail' ? 'warning' : 'error',
      showClose: true,
      duration: 10000
    })
    return null
  } finally {
    vue.$store.commit('requesting', false)
  }
}

export async function api (resource, params = {}) {
  const url = baseUrl + resource
  Object.assign(params, { validateStatus: () => true })
  let resp
  try {
    resp = await axios.get(url, params)
  } catch (e) {
    if (e.request) {
      // the request was made but no response was received
      throw new ApiError('request', 0, e.request)
    } else {
      throw new ApiError('system', 0, e.message)
    }
  }

  switch (resp.data.status) {
    case 'success':
      return resp.data.data
    case 'fail':
      throw new ApiFail('fail', resp.status, resp.data.data)
    case 'error':
      throw new ApiError('error', resp.status, resp.data.message)
    default:
      throw new ApiError('response', resp.status, resp.statusText)
  }
}
