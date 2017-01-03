/*
 * This file is part of the Inferno debug project.
 *
 * (c) Magnus Bergman <hello@magnus.sexy>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import {
  INCREMENT,
  NAVIGATE_TO,
} from 'constants/constants';

const initialState = {
  page: 0,
  counter: 0,
};

/**
 * This is the app reducer. It listens for actions and updates the app object.
 *
 * @author Magnus Bergman <hello@magnus.sexy>
 */
export default function (state = initialState, { type, payload }) {
  switch (type) {

    case NAVIGATE_TO:
      return {
        ...state,
        ...payload,
      };

    case INCREMENT:
      return {
        ...state,
        counter: state.counter + 1,
      };

    default:
      return state;

  }
}
