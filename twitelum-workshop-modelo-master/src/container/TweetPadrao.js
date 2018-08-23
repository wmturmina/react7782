import { connect } from 'react-redux'
import Tweet from '../components/Tweet'
import * as TweetsActions from '../actions/TweetsActions'
import * as NotificacaoActions from '../actions/NotificacaoActions'

const mapDispatchToPros = (dispatchRecebido, propsRecebidas) => {
  return {
    onRemove: () => {
      dispatchRecebido(TweetsActions.remover(propsRecebidas.id))
      dispatchRecebido(NotificacaoActions.carrega('Tweet removido com sucesso!'))
    },
    onLike: () => {
      dispatchRecebido(TweetsActions.like(propsRecebidas.id))
    }
  }
}

export default connect(null, mapDispatchToPros)(Tweet)