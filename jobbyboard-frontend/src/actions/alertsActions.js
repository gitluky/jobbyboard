export function updateErrors(payload) {
  return (dispatch) => {
    dispatch({type: 'UPDATE_ERRORS', payload: payload })
  }
}
export function updateNotifications(payload) {
  return (dispatch) => {
    dispatch({type: 'UPDATE_NOTIFICATIONS', payload: payload })
  }
}

export function updateAuthErrors(payload) {
  return (dispatch) => {
    dispatch({type: 'UPDATE_AUTH_ERRORS', payload: payload })
  }
}

export function clearAlerts() {
  return (dispatch) => {
    dispatch({type: 'CLEAR_ALERTS'})
  }
}
