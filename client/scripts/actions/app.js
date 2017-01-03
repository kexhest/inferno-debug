/*
 * This file is part of the Inferno debug project.
 *
 * (c) Magnus Bergman <hello@magnus.sexy>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import {
	NAVIGATE_TO,
  INCREMENT,
} from 'constants/constants';

/**
 * Navigate to action.
 *
 * @param {Object} page
 *
 * @return {Object}
 */
export const navigateTo = page => ({
  type: NAVIGATE_TO,
  payload: {
    page,
  },
});

/**
 * Increment action.
 *
 * @return {Object}
 */
export const increment = () => ({
  type: INCREMENT,
});
