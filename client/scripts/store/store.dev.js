/*
 * This file is part of the Inferno debug project.
 *
 * (c) Magnus Bergman <hello@magnus.sexy>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import rootReducer from 'reducers/reducers';

/**
 * This is the redux store. It applies reducers and middlewares.
 *
 * @author Magnus Bergman <magnus@apt.no>
 */
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk, createLogger())
  )
);

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('reducers/reducers', () =>
    store.replaceReducer(require('reducers/reducers').default)
  );
}

export default store;
