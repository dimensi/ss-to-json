function testOnURL (value) {
  const input = document.createElement('input')
  input.type = 'url'
  input.value = value
  return input.validity.valid
}

function getConfigFromURL (value) {
  if (!testOnURL(value)) {
    return null
  }
  const { pathname, search, hash } = new URL(value)

  const name = decodeURIComponent(hash.slice(1))
  const [params, server] = pathname
    .split('//')
    .join('')
    .split('@')
  const { method, password } = getMethodAndPass(params)

  return {
    name,
    server,
    method,
    password,
    params: Array.from(new URLSearchParams(search)).map(el => el.join('=')).join(';')
  }
}

function getMethodAndPass (value) {
  const [method, password] = window
    .atob(value)
    .trim()
    .split(':')
  return {
    method,
    password
  }
}

export const convertToJSON = (result) => JSON.stringify(result, null, 2)

export const convertSStoObject = (/** @type {string} */ url) => {
  const defaults = {
    server: '',
    password: '',
    method: ''
  }

  try {
    const config = getConfigFromURL(url)
    const result = Object.assign({}, defaults, {
      name: config.name,
      server: config.server,
      // params: config.params,
      method: config.method,
      password: config.password
    })

    return result
  } catch (err) {
    console.log(err)
    return null
  }
}

export const formToObject = (form) =>
  Array.from(new FormData(form)).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: value
    }),
    {}
  )
