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
