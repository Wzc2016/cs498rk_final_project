import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import PostPage from '../Post'
import CategoryPage from '../Category'
import ResetPage from '../PasswordChange'
import Detailed from '../Detailed'

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

const App = () => (
	<Router>
		<div>
			<Navigation />

			<hr />
			<Route exact path={ROUTES.DETAILED} component={Detailed} />
			<Route exact path={ROUTES.LANDING} component={LandingPage} />
			<Route path={ROUTES.SIGN_UP} component={SignUpPage} />
			<Route path={ROUTES.SIGN_IN} component={SignInPage} />
			<Route path={ROUTES.ACCOUNT} component={AccountPage} />
			<Route path={ROUTES.ADMIN} component={AdminPage} />
			<Route path={ROUTES.POST} component={PostPage} />
			<Route path={ROUTES.CATEGORY} component={CategoryPage} />
			<Route path={ROUTES.RESET} component={ResetPage} />
		</div>
  </Router>
);

export default withAuthentication(App);
