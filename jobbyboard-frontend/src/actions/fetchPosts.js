export function fetchInitialPosts(domain) {
  return (dispatch) => {
    dispatch({ type: 'GETTING_POSTS', })
    fetch(`${domain}`)
    .then(resp => resp.json())
    .then(json => dispatch({ type: 'GET_POSTS', payload: json.data }))
  }
}
