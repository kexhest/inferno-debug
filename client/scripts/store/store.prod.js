/*
 * This file is part of the Inferno debug project.
 *
 * (c) Magnus Bergman <hello@magnus.sexy>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from 'reducers/reducers';

/**
 * This is the redux store. It applies reducers and middlewares.
 *
 * @author Magnus Bergman <magnus@apt.no>
 */
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
