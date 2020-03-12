export function fetchUserData(url, jwt) {
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
    .then(json => dispatch({ type: 'GET_USER_DATA', payload: json.data }))
  }
}
