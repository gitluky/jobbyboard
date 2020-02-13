export default function apiReducer(state={},action) {
  switch(action.type) {
    case 'SET_API_DOMAIN':
      return {...state, domain: action.payload };
    default:
      return state;
  }
}
