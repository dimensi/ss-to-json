function testOnURL (value) {
  const input = document.createElement('input')
  input.type = 'url'
  input.value = value
  return input.validity.valid
}

function getConfigFromURL (value) {
  // Проверка URL с ранним возвратом
  if (!testOnURL(value)) return null

  const { pathname, search, hash, username, host } = new URL(value)
  const name = decodeURIComponent(hash.slice(1))

  // Определение начальных значений
  let server = host
  let method, password

  if (username && host) {
    // Если есть username и host, используем их
    ({ method, password } = getMethodAndPass(username))
  } else {
    // Если username и host нет, разбираем из pathname
    const [params, parsedHost] = pathname.replace(/^\/+/, '').split('@')
    server = parsedHost || server; // В случае если host пустой
    ({ method, password } = getMethodAndPass(params))
  }

  // Формирование строки параметров
  const params = new URLSearchParams(search)
  const formattedParams = Array.from(params.entries())
    .map(([key, value]) => `${key}=${value}`)
    .join(';')

  return {
    name,
    server,
    method,
    password,
    params: formattedParams
  }
}

function getMethodAndPass (value) {
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
