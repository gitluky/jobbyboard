export function fetchUserData(url, jwt, history) {
  return (dispatch) => {
    dispatch({ type: 'GETTING_POSTS', })
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `${jwt}`,
      },
      credentials: 'include'
    })
    .then(resp => resp.json())
    .then(json => {
      if (!!json.errors) {
        history.push('/');
        console.log(json.errors)
      } else {
        dispatch({ type: 'GET_USER_DATA', payload: json.data })
      }
    })
  }
}
