export const carrega = (notificaoDesejada) => {
  return (dispatch) => {
    dispatch({ type: 'ADD_NOTIFICACAO', notificacao: notificaoDesejada })
    setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFICACAO' })
    }, 2000)
  }
}