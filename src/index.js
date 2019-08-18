import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import App from './components/app';
import Firebase, { FirebaseContext } from './components/firebase';

import './index.css';

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root'));

// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
