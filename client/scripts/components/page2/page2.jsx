/*
 * This file is part of the Inferno debug project.
 *
 * (c) Magnus Bergman <hello@magnus.sexy>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import Inferno from 'inferno';
import Component from 'inferno-component';

/**
 * This is the Page2 component.
 */
export default class Page2 extends Component {

  /**
   * Increment counter when the component mounts.
   *
   * @return {void}
   */
  componentDidMount() {
    const { increment } = this.props;

    increment();
  }

  /**
   * Render Page2.
   *
   * @return {Object}
   */
  render() {
    const { counter } = this.props;

    return (
      <section>
				<header>
					<h1>Page2</h1>
				</header>
        <p>counter: {counter}</p>
      </section>
    );
  }
}
