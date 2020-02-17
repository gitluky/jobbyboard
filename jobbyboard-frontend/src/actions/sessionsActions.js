export function signInUser(domain, payload, history) {
  return (dispatch) => {
    fetch(`${domain}/users/sign_in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ user: payload})
    })
    .then(resp => resp.json())
    .then(json => {
      dispatch({type: 'SIGN_IN', payload: json });

    })
    .catch(error => console.log(error));
  };
};

function signOutUser() {

}

function signUpUser() {

}

export function isSignedIn(domain) {
  return (dispatch) => {
    fetch(`${domain}`)
    .then(resp => {
      return resp.json()
    })
    .then(json => {
      console.log(json)
      return dispatch({type: 'IS_SIGNED_IN', payload: json.isSignedIn })
    })
  }
}
