export function updateErrors(payload) {
  return (dispatch) => {
    dispatch({type: 'UPDATE_ERRORS', payload: payload })
  }
}

export function updateAuthErrors(payload) {
  return (dispatch) => {
    dispatch({type: 'UPDATE_AUTH_ERRORS', payload: payload })
  }
}

export function clearErrors() {
  return (dispatch) => {
    dispatch({type: 'CLEAR_ERRORS'})
  }
}
