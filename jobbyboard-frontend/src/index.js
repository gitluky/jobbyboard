import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import sessionsReducer from './reducers/sessionsReducer';
import postsReducer from './reducers/postsReducer';
import apiReducer from './reducers/apiReducer';

const rootReducer = combineReducers({
  session: sessionsReducer,
  posts: postsReducer,
  api: apiReducer
});

const initialState = {
  session: {
    isSignedIn: false,
    failedRefresh: false
   },
  api: {
    domain: 'https://localhost:3001'
  },
  posts: {}
}

const store = createStore(rootReducer, initialState, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route path="/" render={props => <App {...props} />}/>
      </div>
    </Router>
  </Provider>,
document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
