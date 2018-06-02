import {
  sprintf
} from 'sprintf-js'

const patterns = {
  port: '[1-9][0-9]{0,4}',
  ip: '\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b',
  base64: '(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?',
  ssHost: '^ss:\\/\\/',
  method: '[^:]+',
  password: '[^@]+'
}

const halfBase64RegExp = sprintf('%s(%s)@(%s):(%s)',
  patterns.ssHost,
  patterns.base64,
  patterns.ip,
  patterns.port
)
const fullBase64RegExp = sprintf('%s(%s)', patterns.ssHost, patterns.base64)
const URLRegExp = sprintf('(%s):(%s)@(%s):(%s)',
  patterns.method,
  patterns.password,
  patterns.ip,
  patterns.port
)

const testOnHalfBase64 = (value) => new RegExp(halfBase64RegExp).test(value)
const parseHalfBase64 = (value) => {
  const [, config, server, port] = new RegExp(halfBase64RegExp).exec(value)
  return {
    config,
    server,
    port
  }
}

const testOnFullBase64 = (value) => new RegExp(fullBase64RegExp).test(value)
const parseFullBase64 = (value) => {
  const [, base64] = new RegExp(fullBase64RegExp).exec(value)
  return {
    base64
  }
}

const testOnURL = (value) => {
  const input = document.createElement('input')
  input.type = 'url'
  input.value = value
  return input.validity.valid
}

const parseURL = (value) => {
  const [, method, password, server, port] = new RegExp(URLRegExp).exec(value)
  return {
    method,
    password,
    server,
    port
  }
}

const getConfigFromURL = (value) => {
  const convertedURL = window.atob(value).trim()
  if (!testOnURL(convertedURL)) {
    return null
  }
  const parsedURL = parseURL(convertedURL)

  return parsedURL
}
const getMethodAndPass = (value) => {
  const [method, password] = window.atob(value).trim().split(':')
  return {
    method,
    password
  }
}

export const convertToJSON = (result) => JSON.stringify(result, null, 2)

export const convertSStoObject = (/** @type {string} */ url) => {
  const defaults = {
    server: '',
    server_port: 8388,
    local_port: 1080,
    password: '',
    timeout: 600,
    method: ''
  }

  if (testOnHalfBase64(url)) {
    const parsedSS = parseHalfBase64(url)
    const result = Object.assign({}, defaults, {
      server: parsedSS.server,
      server_port: Number(parsedSS.port),
      ...getMethodAndPass(parsedSS.config)
    })

    return result
  }

  if (testOnFullBase64(url)) {
    const { base64 } = parseFullBase64(url)
    try {
      const config = getConfigFromURL(base64)
      const result = Object.assign({}, defaults, {
        server: config.server,
        server_port: Number(config.port),
        method: config.method,
        password: config.password
      })

      return result
    } catch (err) {
      return null
    }
  }

  return null
}
