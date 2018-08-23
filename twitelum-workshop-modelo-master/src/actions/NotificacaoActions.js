export const carrega = (notificaoDesejada) => {
  return (dispatch) => {
    dispatch({ type: 'ADD_NOTIFICACAO', notificacao: notificaoDesejada })
  }
}

export const remove = () => {
  return (dispatch) => {
    dispatch({ type: 'REMOVE_NOTIFICACAO' })
  }
}