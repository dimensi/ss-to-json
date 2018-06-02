import { h, app } from 'hyperapp'
import { convertSStoObject, convertToJSON } from './utils'
import 'normalize.css'
import './style.css'

const state = {
  url: '',
  config: null,
  json: '',
  error: '',
  unexpectedError: ''
}

const exampleURL = 'ss://YmYtY2ZiOnRlc3RAMTkyLjE2OC4xMDAuMTo4ODg4Cg'
const exampleURL2 = 'ss://YmYtY2ZiOnRlc3Q=@192.168.100.1:8888'

const actions = {
  setURL: value => () => ({ url: value }),
  setJSON: value => () => ({ json: value !== null ? convertToJSON(value) : null }),
  setConfig: value => () => ({ config: value }),
  setError: value => () => ({ error: value }),
  setUnexpectedError: value => () => ({ unexpectedError: value }),
  convert: event => (state, actions) => {
    actions.setError('')
    actions.setConfig(null)
    actions.setJSON(null)
    actions.setUnexpectedError('')
    event.preventDefault()
    try {
      const config = convertSStoObject(state.url.trim())
      if (config === null) {
        actions.setError('Bad SS URL')
        return
      }
      actions.setConfig(config)
      actions.setJSON(config)
    } catch (error) {
      console.error('Error while converting', error)
      actions.setUnexpectedError(error.toString())
    }
  }
}

const resultList = (list) => (
  <ul className='result__ul'>
    {Object.keys(list).map(key =>
      <li className='result__item'>
        <span className='result__key'>{key}:</span>
        <input className='result__input' type='text' value={list[key]} />
      </li>)}
  </ul>
)

const view = (state, actions) => (
  <main className='main'>
    <div className='main__wrapper'>
      <h1 className='title'>Convert SS URL to JSON</h1>
      <form className='form' onsubmit={(event) => actions.convert(event)}>
        <input type='text'
          className='form__input'
          value={state.url}
          required
          oninput={(event) => actions.setURL(event.target.value)} />
        <button className='form__button'>Convert</button>
      </form>
      {!state.json && <div className='example'>
        Example: {exampleURL}<br /> or <br />
        {exampleURL2}
      </div>}
      {state.error && <div className='error'>
        {state.error}
      </div>}
      {state.unexpectedError && <div className='error'>
        Got error? Report <a href='https://github.com/dimensi/ss-to-json/issues/new' target='_blank'>this</a>, please.
        <br />
        {state.unexpectedError}
      </div>}
      {state.json && <div className='result'>
        <div className='result__code'>
          <code>
            <pre>{state.json}</pre>
          </code>
        </div>
        <div className='result__list'>
          {resultList(state.config)}
        </div>
      </div>}
    </div>
  </main>
)

const main = document.querySelector('main.main')
document.body.removeChild(main)
app(state, actions, view, document.body)
