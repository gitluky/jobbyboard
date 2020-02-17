export function setApiDomain(domain) {
  return (dispatch)  => {
    dispatch({type: 'SET_API_DOMAIN', payload: domain });
  }
}
