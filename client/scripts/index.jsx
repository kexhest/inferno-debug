/*
 * This file is part of the Inferno debug project.
 *
 * (c) Magnus Bergman <hello@magnus.sexy>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import Inferno, { render } from 'inferno';
import { Provider } from 'inferno-redux';

import store from 'store/store';

import App from 'components/app/app';

render(
	<Provider store={store}>
		<App />
	</Provider>
, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
