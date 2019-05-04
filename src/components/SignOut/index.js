import React from 'react';
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
	<Link to={ROUTES.LANDING} onClick={firebase.doSignOut}>
		Sign Out
	</Link>
);

export default withFirebase(SignOutButton);
