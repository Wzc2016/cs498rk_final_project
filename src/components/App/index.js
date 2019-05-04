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
			<Route exact path={process.env.PUBLIC_URL + ROUTES.DETAILED} component={Detailed} />
			<Route exact path={process.env.PUBLIC_URL + ROUTES.LANDING} component={LandingPage} />
			<Route exact path={process.env.PUBLIC_URL + ROUTES.SIGN_UP} component={SignUpPage} />
			<Route exact path={process.env.PUBLIC_URL + ROUTES.SIGN_IN} component={SignInPage} />
			<Route exact path={process.env.PUBLIC_URL + ROUTES.ACCOUNT} component={AccountPage} />
			<Route exact path={process.env.PUBLIC_URL + ROUTES.ADMIN} component={AdminPage} />
			<Route exact path={process.env.PUBLIC_URL + ROUTES.POST} component={PostPage} />
			<Route exact path={process.env.PUBLIC_URL + ROUTES.CATEGORY} component={CategoryPage} />
			<Route exact path={process.env.PUBLIC_URL + ROUTES.RESET} component={ResetPage} />
		</div>
  </Router>
);

export default withAuthentication(App);
