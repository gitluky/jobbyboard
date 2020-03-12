export default function postsReducer(state = {}, action) {
  switch(action.type) {
    case 'GETTING_POSTS':
      return { ...state, requesting: true };
    case 'GET_INITIAL_POSTS':
      return { ...state, requesting: false, initialPosts: action.payload };
    case 'GET_SEARCH_RESULTS':
      return { ...state, requesting: false, searchResults: action.payload };
    default:
      return state;
  }
}
