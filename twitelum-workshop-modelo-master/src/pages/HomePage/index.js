import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import Cabecalho from '../../components/Cabecalho'
import NavMenu from '../../components/NavMenu'
import Dashboard from '../../components/Dashboard'
import Widget from '../../components/Widget'
import TrendsArea from '../../components/TrendsArea'
import Tweet from '../../components/Tweet'
import TweetPadrao from '../../container/TweetPadrao'
import Modal from '../../components/Modal'
import * as TweetsActions from '../../actions/TweetsActions'

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

  componentDidMount() {
    this.context.store.subscribe(() => {
      const tweetsDoStore = this.context.store.getState().listaDeTweets
      this.setState({
        mensagem: tweetsDoStore.length === 0 ? 'Adicione um Tweet aqui' : '',
        tweets: tweetsDoStore
      })
    })
    this.context.store.dispatch(TweetsActions.carrega())
  }

  adicionaTweet = (event) => {
    event.preventDefault()
    if (this.state.novoTweet) {
      this.context.store.dispatch(TweetsActions.adicionar(this.state.novoTweet))
      this.setState({
        novoTweet: '',
      })
    }
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
                    <TweetPadrao
                      key={tweetAtual._id}
                      removivel={tweetAtual.removivel}
                      conteudo={tweetAtual.conteudo}
                      usuario={tweetAtual.usuario}
                      totalLikes={tweetAtual.totalLikes}
                      likeado={tweetAtual.likeado}
                      id={tweetAtual._id}
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
