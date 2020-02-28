export function fetchInitialPosts(domain) {
  return (dispatch) => {
    dispatch({ type: 'GETTING_POSTS', })
    fetch(`${domain}`)
    .then(resp => resp.json())
    .then(json => dispatch({ type: 'GET_INITIAL_POSTS', payload: json.data }))
  }
}

export function fetchSearchResults(url) {
  return (dispatch) => {
    dispatch({ type: 'GETTING_POSTS', })
    fetch(url)
    .then(resp => resp.json())
    .then(json => dispatch({ type: 'GET_SEARCH_RESULTS', payload: json.data }))
  }
}

export function fetchUserPosts(url, jwt) {
  return (dispatch) => {
    dispatch({ type: 'GETTING_POSTS', })
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `${jwt}`
      }})
    .then(resp => resp.json())
    .then(json => dispatch({ type: 'GET_USER_POSTS', payload: json.data }))
  }
}
