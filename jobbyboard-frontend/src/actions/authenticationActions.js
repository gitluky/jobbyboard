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
      const jwt = resp.headers.get('Authorization');
      dispatch({ type: 'GET_TOKEN', payload: jwt });
      return resp.json()
    })
    .then(json => {
      if (json.error) {
        dispatch({type: 'UPDATE_AUTH_ERRORS', payload: json.error})
      } else {
        dispatch({ type: 'SIGN_IN', payload: json })
        dispatch({ type: 'CLEAR_ERRORS' })
        history.push(`/users/${json.id}`)
      }
    })
    .catch(error => {
      dispatch({type: 'UPDATE_AUTH_ERRORS', payload: error.message })
    });
  };
};

export function trySessionRefresh(domain, history) {
  return (dispatch) => {
    fetch(`${domain}/refresh_session`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include'
    })
    .then(resp => {
      const jwt = resp.headers.get('Authorization');
      dispatch({ type: 'GET_TOKEN', payload: jwt });
      return resp.json()
    })
    .then(json => {
      dispatch({ type: 'SIGN_IN', payload: json })
    })
    .catch(error => console.log(error));
  };
};

export function signOut(domain, {jwt}, { history }) {
  return (dispatch) => {
    fetch(`${domain}/users/sign_out`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `${jwt}`
      },
      credentials: 'include'
    })
    .then(resp => resp.json())
    .then(json => {
      window.location.href = "/";
    })
    .catch(error => console.log(error));
  };
};
