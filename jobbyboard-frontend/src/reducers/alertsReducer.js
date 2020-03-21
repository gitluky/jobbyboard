export default function alertsReducer(state={}, action) {
  switch(action.type) {
    case 'UPDATE_ERRORS':
      return {...state, errors: action.payload}
    case 'UPDATE_AUTH_ERRORS':
      return {...state, errors: [action.payload]}
    case 'CLEAR_ERRORS':
      return state.errors = []
    default:
      return state;
  }
}
