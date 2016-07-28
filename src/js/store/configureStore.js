import { compose, createStore, applyMiddleware } from 'redux'
import { persistState } from 'redux-devtools';
import rootReducer from '../reducers'
import DevTools from './../containers/DevTools';
// middleware
import thunk from 'redux-thunk';


const enhancer = compose(
    applyMiddleware(thunk), // any Redux middleware, e.g. redux-thunk
    DevTools.instrument(), // Provides support for DevTools
    persistState( // Lets you write ?debug_session=<name> in address bar to persist debug sessions
      window.location.href.match(
        /[?&]debug_session=([^&#]+)\b/
      )
    )
);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers').default)
    );
  }

  return store;
}
