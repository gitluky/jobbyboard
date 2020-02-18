export default function sessionsReducer(state = {}, action) {
  switch(action.type) {
    case 'SIGN_IN':
      return { ...state, isSignedIn: true, user: action.payload }
    case 'SIGN_OUT':
      return { ...state, user: action.payload }
    case 'GET_TOKEN':
      return { ...state, jwt: action.payload }
    default:
      return state;
  }
}
