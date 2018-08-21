export const carrega = () => {
  return (dispatch) => {
    fetch(`http://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`)
      .then((response) => {
        return response.json()
      })
      .then((responseTweets) => {
        dispatch({type: 'CARREGA_TWEETS', tweets: responseTweets})
      })
  }
}

export const adicionar = (novoTweet) => {
  return (dispatch) => {
    fetch(`http://twitelum-api.herokuapp.com/tweets?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`,
      {
        method: 'POST',
        body: JSON.stringify({ conteudo: novoTweet })
      })
      .then((response) => {
        return response.json()
      })
      .then((responseNovoTweet) => {
        dispatch({type: 'ADD_TWEET', novoTweet: responseNovoTweet})
      })
  }
}

export const remover = (idDoTweet) => {
  return (dispatch) => {
    fetch(`http://twitelum-api.herokuapp.com/tweets/${idDoTweet}?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`,
      {
        method: 'DELETE'
      })
        .then((response) => {
          if (!response.ok) throw response
          return response.json()
        })
      .then((responseNovoTweet) => {
        dispatch({type: 'REMOVE_TWEET', idDoTweetRemovido: idDoTweet})
      })
  }
}