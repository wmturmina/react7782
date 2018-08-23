import { createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk'

function tweetsReducer(stateAtual = { listaDeTweets: [], tweetAtivo: {} }, action = {}){
  let tweetAtivoDeRetorno = stateAtual.tweetAtivo
  let listaDeTweetsRetorno = stateAtual.listaDeTweets

  if(action.type === 'CARREGA_TWEETS') {
    listaDeTweetsRetorno = action.tweets
  }

  if(action.type === 'ADD_TWEET') {
    listaDeTweetsRetorno = [action.novoTweet, ...listaDeTweetsRetorno]
  }

  if(action.type === 'REMOVE_TWEET') {
    listaDeTweetsRetorno = listaDeTweetsRetorno.filter((item) => item._id !== action.idDoTweetRemovido)
  }

  if(action.type === 'ADD_TWEET_ATIVO') {
    tweetAtivoDeRetorno = listaDeTweetsRetorno.find((item) => item._id === action.idTweetSelecionado)
  }

  if(action.type === 'REMOVE_TWEET_ATIVO') {
    tweetAtivoDeRetorno = {}
  }

  if(action.type === 'LIKE_TWEET') {
    listaDeTweetsRetorno = listaDeTweetsRetorno.map((item) => {
      let localItem = item
      if (localItem._id === action.idDoTweetLikeado) {
        const {
          likeado,
          totalLikes,
          likes
        } = localItem
        if (likeado) {
          localItem.likes = likes.filter((likedByItem) => likedByItem.usuario.login !== action.likeadoBy)
        } else {
          localItem.likes = [{ usuario: { login: action.likeadoBy }} , ...likes]
        }
        localItem.likeado = !likeado
        localItem.totalLikes = totalLikes + (likeado ? -1 : +1)
      }
      return localItem
    })
    tweetAtivoDeRetorno = listaDeTweetsRetorno.find((item) => item._id === tweetAtivoDeRetorno._id) || {}
  }

  return {
    listaDeTweets: listaDeTweetsRetorno,
    tweetAtivo: tweetAtivoDeRetorno
  }
}

function notificacaoReducer(stateAtual = '', action = {}){
  let notificacaoAtual = stateAtual
  if(action.type === 'ADD_NOTIFICACAO') {
    notificacaoAtual = action.notificacao
  }

  if(action.type === 'REMOVE_NOTIFICACAO') {
    notificacaoAtual = ''
  }
  return notificacaoAtual
}

export default createStore(
  combineReducers({
    tweet: tweetsReducer,
    notificacao: notificacaoReducer
  }),
  applyMiddleware(
    thunk
  )
)
