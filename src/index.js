/* eslint-disable import/default */

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
import {loadGensData} from './actions/gensActions';
import * as env from './constants/env';
require('./favicon.ico'); // Tell webpack to load favicon.ico
import './styles/bootstrap.css';
import './styles/react-bootstrap-switch.min.css'; // eslint-disable-line no-use-before-define
import './styles/login-styles.scss'; // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.
import './styles/sb-admin.css';
import './styles/styles.scss';
import '../node_modules/toastr/build/toastr.min.css';

// import { syncHistoryWithStore } from 'react-router-redux';

const store = configureStore();

// store.dispatch(loadGensData());


// Create an enhanced history that syncs navigation events with the store
// const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>, document.getElementById('app')
);
