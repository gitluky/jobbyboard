export default function sessionsReducer(state = {}, action) {
  switch(action.type) {
    case 'SIGN_IN':
      return { ...state, ...action.payload }
    case 'SIGN_OUT':
      return { ...state, ...action.payload }
    case 'GET_TOKEN':
      return { ...state, jwt: action.payload }
    default:
      return state;
  }
}
