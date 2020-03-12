export default function usersReducer(state = {}, action) {
  switch(action.type) {
    case 'GET_USER_DATA':
      return { ...state, requesting: false, [action.payload.id]: action.payload };
    default:
      return state;
  }
}
