export default function sessionsReducer(state = {}, action) {
  switch(action.type) {
    case 'SIGN_IN':
      return { ...state, data: action.payload }
    case 'SIGN_OUT':
      return { ...state, data: action.payload }
    case 'IS_SIGNED_IN':
      return {...state, isSignedIn: action.payload }
    default:
      return state;
  }
}
