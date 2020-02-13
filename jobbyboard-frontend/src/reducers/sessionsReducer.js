export default function sessionsReducer(state = {}, action) {
  switch(action.type) {
    case 'SIGN_IN':
      return { ...state, session: action.payload }
    case 'SIGN_OUT':
      return { ...state, session: action.payload }
    default:
      return state;
  }
}
