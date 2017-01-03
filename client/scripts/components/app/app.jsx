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
import { connect } from 'inferno-redux';

import Page1 from 'components/page1/page1';
import Page2 from 'components/page2/page2';

import { increment as incrementAction, navigateTo as navigateToAction } from 'actions/app';

import './app.scss';

/**
 * This is the App component.
 */
class App extends Component {

  /**
   * Bind a keydown eventlistener to window for navigation between pages.
   *
   * @return {void}
   */
  componentDidMount() {
    window.addEventListener('keydown', (e) => {
      const { navigateTo } = this.props;

      if (e.keyCode === 49) {
        navigateTo(0);
      }

      if (e.keyCode === 50) {
        navigateTo(1);
      }
    }, false);
  }

  /**
   * Logging when the component is updated.
   *
   * @return {void}
   */
  componentDidUpdate(prevProps) {
    const { page, counter } = this.props;

    if (prevProps.counter !== counter) {
      console.log('counter has been updated!');
    }

    // console.log('This should be called twice, once for page update and once for counter update.');
    // console.log('counter: ', counter);
    // console.log('page: ', page);
    // console.log('---------------------------------------------');
  }

  /**
   * Render App.
   *
   * @return {Object}
   */
  renderPage() {
    const { page, increment, counter } = this.props;

    console.log(page);

    switch (page) {
      case 0:
        return <Page1 increment={increment} counter={counter} />;

      case 1:
        return <Page2 increment={increment} counter={counter} />;

      default:
        return null;
    }
  }

  render() {
    console.log(this.props);
    return (
      <article>
        {this.renderPage()}
      </article>
    );
  }
}

/**
 * Map state to props.
 *
 * @param {Object} state
 *
 * @return {Object}
 */
const mapStateToProps = state => ({
  counter: state.app.counter,
  page: state.app.page,
});

/**
 * Export redux container component by subscribing the component to the store
 * and binding necessary action dispatchers.
 */
export default connect(
  mapStateToProps,
  {
    increment: incrementAction,
    navigateTo: navigateToAction,
  }
)(App);
