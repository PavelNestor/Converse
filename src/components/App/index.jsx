import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import AccountPage from '../account';
import AdminPage from '../admin';
import HomePage from '../home';
import LandingPage from '../landing';
import Navigation from '../navigation';
import PasswordForgetPage from '../passwordforget';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../session';

const App = () => (
  <Router>
    <div>
      <Navigation />
      
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
      <Route path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
    </div>
  </Router>
);

export default withAuthentication(App);
