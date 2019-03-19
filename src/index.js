import { html, render } from 'lit-html'
import { render as renderButton } from 'github-buttons'
import { convertSStoObject, convertToJSON, formToObject } from './utils'
import 'normalize.css'
import './style.css'

renderButton()

const renderBlock = document.querySelector('.render')
const form = document.querySelector('.form')

const renderItem = (key, value) => html`
  <li class="result__item">
    <span class="result__key">${key}:</span>
    <input class="result__input" type="text" value="${value}" />
  </li>
`

const resultList = list => html`
  <ul class="result__ul">
    ${Object.keys(list).map(key => renderItem(key, list[key]))}
  </ul>
`

const App = ({ json, config, error, unexpectedError }) => {
  if (error) {
    return html`
      <div class="error">
        ${error}
      </div>
    `
  }

  if (unexpectedError) {
    return html`
      <div class="error">
        Got error? Report
        <a
          href="https://github.com/dimensi/ss-to-json/issues/new"
          target="_blank"
          >this</a
        >, please.
        <br />
        ${unexpectedError}
      </div>
    `
  }

  return html`
    <div class="result">
      <div class="result__code">
        <code>
          <pre>${json}</pre>
        </code>
      </div>
      <div class="result__list">
        ${resultList(config)}
      </div>
    </div>
  `
}

form.addEventListener('submit', e => {
  e.preventDefault()
  const { link } = formToObject(e.target)

  const data = {
    json: null,
    config: null,
    error: null,
    unexpectedError: null
  }

  try {
    const config = convertSStoObject(link.trim())
    if (config === null) {
      data.error = 'Bad SS URL'
    } else {
      data.config = config
      data.json = convertToJSON(config)
    }
  } catch (error) {
    console.error('Error while converting', error)
    data.unexpectedError = error.toString()
  }

  render(App(data), renderBlock)
})
