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

const halfBase64RegExp = sprintf('%s(?<config>%s)@(?<server>%s):(?<port>%s)',
  patterns.ssHost,
  patterns.base64,
  patterns.ip,
  patterns.port
)
const fullBase64RegExp = sprintf('%s(?<base64>%s)', patterns.ssHost, patterns.base64)
const URLRegExp = sprintf('(?<method>%s):(?<password>%s)@(?<server>%s):(?<port>%s)',
  patterns.method,
  patterns.password,
  patterns.ip,
  patterns.port
)

const testOnHalfBase64 = (value) => new RegExp(halfBase64RegExp).test(value)
const parseHalfBase64 = (value) => new RegExp(halfBase64RegExp).exec(value).groups

const testOnFullBase64 = (value) => new RegExp(fullBase64RegExp).test(value)
const parseFullBase64 = (value) => new RegExp(fullBase64RegExp).exec(value).groups

const parseURL = (value) => new RegExp(URLRegExp).exec(value).groups

const getConfigFromURL = (value) => {
  const convertedURL = window.atob(value).trim()
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
    const config = getConfigFromURL(base64)
    const result = Object.assign({}, defaults, {
      server: config.server,
      server_port: Number(config.port),
      method: config.method,
      password: config.password
    })

    return result
  }

  return null
}
