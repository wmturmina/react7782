import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

// CSS Global
import './assets/css/reset.css'
import './assets/css/container.css'
import './assets/css/btn.css'
import './assets/css/icon.css'
import './assets/css/iconHeart.css'
import './assets/css/notificacao.css'

import './assets/css/novoTweet.css'
// import './index.css';

import Routes from './routes.js'
import registerServiceWorker from './registerServiceWorker'

import store from './store'

ReactDOM.render(
  <Provider store={store} >
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'))
registerServiceWorker()
