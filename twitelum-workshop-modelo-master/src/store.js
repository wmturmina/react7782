import { createStore, applyMiddleware} from 'redux'
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

  return {
    listaDeTweets: listaDeTweetsRetorno,
    tweetAtivo: tweetAtivoDeRetorno
  }
}

export default createStore(
  tweetsReducer,
  applyMiddleware(
    thunk
  )
)
