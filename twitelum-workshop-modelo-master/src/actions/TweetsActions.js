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
      .then((responseTweetRemovido) => {
        dispatch({type: 'REMOVE_TWEET', idDoTweetRemovido: idDoTweet})
        dispatch({type: 'REMOVE_TWEET_ATIVO'})
      })
  }
}

export const like = (idDoTweet) => {
  return (dispatch) => {
    fetch(`http://twitelum-api.herokuapp.com/tweets/${idDoTweet}/like/?X-AUTH-TOKEN=${localStorage.getItem('TOKEN')}`,
      {
        method: 'POST'
      })
      .then((response) => {
        if (!response.ok) throw response
        return response.json()
      })
      .then((responseLikeTweet) => {
        dispatch({
          type: 'LIKE_TWEET',
          idDoTweetLikeado: idDoTweet,
          likeadoBy: responseLikeTweet.liker
        })
      })
  }
}