import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'
import Modal from '../../components/Modal'

class HomePage extends Component {
  constructor() {
    super()
    this.state = {
      novoTweet: '',
      mensagem: 'Loading...',
      tweets: [],
      tweetAtivo: {}
    }
  }

  static contextTypes = {
    store: PropTypes.object
  }

  adicionaTweet = (event) => {
    event.preventDefault()
    const {
      novoTweet,
      tweets
    } = this.state
    if (novoTweet) {
      fetch(`http://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`,
        {
          method: 'POST',
          body: JSON.stringify({ conteudo: novoTweet })
        })
        .then((response) => {
          return response.json()
        })
        .then((responseNovoTweet) => {
          this.setState({
            novoTweet: '',
            tweets: [responseNovoTweet, ...tweets]
          })
        })
    }
  }

  componentDidMount() {
    this.context.store.subscribe(() => {
      const tweetsDoStore = this.context.store.getState()
      this.setState({
        novoTweet: '',
        mensagem: tweetsDoStore.length === 0 ? 'Adicione um Tweet aqui' : '',
        tweets: tweetsDoStore
      })
    })
    fetch(`http://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`)
      .then((response) => {
        return response.json()
      })
      .then((responseTweets) => {
        this.context.store.dispatch({type: 'CARREGA_TWEETS', tweets: responseTweets})
      })
  }

  removeOTweet = (indiceDoTweet) => {
    const {
      tweets
    } = this.state
    fetch(`http://twitelum-api.herokuapp.com/tweets/${indiceDoTweet}?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`, {
      method: 'DELETE'
    })
      .then((response) => {
        if (!response.ok) throw response
        return response.json()
      })
      .then((responseConvertido) => {
        this.setState({
          tweets: tweets.filter((item) => item._id !== indiceDoTweet)
        })
      })
  }

  abreTweet = (tweetSelecionado) => {
    const {
      tweets
    } = this.state
    this.setState({
      tweetAtivo: tweets.find((item) => item._id === tweetSelecionado)
    })
  }

  fechaTweet = (tweetSelecionado) => {
    this.setState({
      tweetAtivo: {}
    })
  }

  render() {
    const {
      novoTweet,
      tweets,
      mensagem,
      tweetAtivo
    } = this.state
    console.warn(tweetAtivo)
    return (
      <Fragment>
        <Helmet>
          <title>Twitelum - ({`${tweets.length}`})</title>
        </Helmet>
        <Cabecalho>
          <NavMenu usuario={this.usuario} />
        </Cabecalho>
        <div className="container">
          <Dashboard>
            <Widget>
              <form className="novoTweet" onSubmit={this.adicionaTweet}>
                <div className="novoTweet__editorArea">
                  <span
                    className={`novoTweet__status ${
                      novoTweet.length > 140
                        ? 'novoTweet__status--invalido'
                        : ''
                      }`}
                  >
                    {novoTweet.length}/140
                  </span>
                  <textarea
                    className="novoTweet__editor"
                    placeholder="O que está acontecendo?"
                    value={novoTweet}
                    onChange={(event) => { this.setState({ novoTweet: event.target.value }) }}
                  >
                  </textarea>
                </div>
                <button
                  type="submit"
                  className="novoTweet__envia"
                  disabled={novoTweet.length > 140 || novoTweet.length === 0}
                >
                  Tweetar
                </button>
              </form>
            </Widget>
            <Widget>
              <TrendsArea />
            </Widget>
          </Dashboard>
          <Dashboard posicao="centro">
            <Widget>
              <div className="tweetsArea">
                {tweets.length === 0 &&
                  <span>{mensagem}</span>
                }
                {tweets.map((tweetAtual, index) => {
                  return (
                    <Tweet
                      key={tweetAtual._id}
                      removivel={tweetAtual.removivel}
                      conteudo={tweetAtual.conteudo}
                      usuario={tweetAtual.usuario}
                      totalLikes={tweetAtual.totalLikes}
                      likeado={tweetAtual.likeado}
                      id={tweetAtual._id}
                      onRemove={() => { this.removeOTweet(tweetAtual._id) }}
                      onClick={() => { this.abreTweet(tweetAtual._id) }}
                    />
                  )
                })}
              </div>
            </Widget>
          </Dashboard>
        </div>
        <Modal
          isAberto={Boolean(tweetAtivo._id)}
          onClose={() => { this.fechaTweet() }}>
            {tweetAtivo._id &&
              <Widget>
                <Tweet
                  key={`ativo-${tweetAtivo._id}`}
                  conteudo={tweetAtivo.conteudo}
                  usuario={tweetAtivo.usuario}
                  id={tweetAtivo._id}
                  inModal={true}
                  likedBy={tweetAtivo.likes}
                  likeado={tweetAtivo.likeado}
                  totalLikes={tweetAtivo.totalLikes}
                />
              </Widget>
            }
        </Modal>
      </Fragment>

    );
  }
}

export default HomePage;
