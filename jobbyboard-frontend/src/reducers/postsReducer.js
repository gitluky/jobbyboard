export default function postsReducer(state = {}, action) {
  switch(action.type) {
    case 'GETTING_POSTS':
      return { ...state, requesting: true };
    case 'GET_POSTS':
      return { ...state, requesting: false, initialPosts: action.payload };
    default:
      return state;
  }
}
