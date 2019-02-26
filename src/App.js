import React, {Component} from 'react';
import {Provider} from 'react-redux'
import MainNav from './screensNavigator/MainNav'
import Store from './redux/Store'

export default class App extends Component {

  render() {
    return (
      <Provider store={Store}>
        <MainNav />
      </Provider>
    );
  }
}
