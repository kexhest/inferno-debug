/*
 * This file is part of the Inferno debug project.
 *
 * (c) Magnus Bergman <hello@magnus.sexy>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { combineReducers } from 'redux';

import app from './app';

/**
 * This is the root reducer. It combines all reducers into a unified one.
 *
 * @author Magnus Bergman <hello@magnus.sexy>
 */
const rootReducer = combineReducers({
  app,
});

export default rootReducer;
