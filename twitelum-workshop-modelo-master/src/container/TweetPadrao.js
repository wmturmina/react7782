import { connect } from 'react-redux'
import Tweet from '../components/Tweet'
import * as TweetsActions from '../actions/TweetsActions'

const mapDispatchToPros = (dispatchRecebido, propsRecebidas) => {
  return {
    onRemove: () => {
      dispatchRecebido(TweetsActions.remover(propsRecebidas.id))
    },
    onLike: () => {
      dispatchRecebido(TweetsActions.like(propsRecebidas.id))
    }
  }
}

export default connect(null, mapDispatchToPros)(Tweet)