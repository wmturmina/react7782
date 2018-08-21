import { createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

function tweetsReducer(stateAtual = { listaDeTweets: [], tweetAtivo: {} }, action = {}){
  let stateDeRetorno = stateAtual

  if(action.type === 'CARREGA_TWEETS') {
    stateDeRetorno.listaDeTweets = action.tweets
  }

  if(action.type === 'ADD_TWEET') {
    stateDeRetorno.listaDeTweets = [action.novoTweet, ...stateDeRetorno.listaDeTweets]
  }

  if(action.type === 'REMOVE_TWEET') {
    stateDeRetorno.listaDeTweets = stateDeRetorno.filter((item) => item._id !== action.idDoTweetRemovido)
  }
  
  return stateDeRetorno
}

export default createStore(
  tweetsReducer,
  applyMiddleware(
    thunk
  )
)
