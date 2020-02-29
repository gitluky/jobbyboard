export function signInUser(domain, payload, history) {
  return (dispatch) => {
    fetch(`${domain}/users/sign_in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ user: payload }),
    })
    .then(resp => {
      debugger;
      const jwt = resp.headers.get('Authorization');
      dispatch({ type: 'GET_TOKEN', payload: jwt });
      return resp.json()
    })
    .then(json => {
      dispatch({ type: 'SIGN_IN', payload: json })
      history.push('/')
    })
    .catch(error => console.log(error));
  };
};
