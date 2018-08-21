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