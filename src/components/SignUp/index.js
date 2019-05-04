import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { Form, Button } from 'semantic-ui-react'
import './signup.scss';
import axios from 'axios';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import * as URL from '../../constants/url'

const SignUpPage = () => (
  <div>
	<SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

class SignUpFormBase extends Component {
  constructor(props) {
	super(props);

	this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
	const { username, email, passwordOne, isAdmin } = this.state;
	const roles = {};


	axios.post(URL.url + '/api/users', {
		name: username,
		email: email,
		password: passwordOne,
	}).then((response) => {
		console.log(response.data.data._id);
		window.sessionStorage.setItem('userId', response.data.data._id)
	})



	.then(function (response) {
		console.log(response);
	})
	.catch(function (error) {
		console.log(error);
	});

	this.props.firebase
	  .doCreateUserWithEmailAndPassword(email, passwordOne)
	  .then(authUser => {
		// Create a user in your Firebase realtime database
		return this.props.firebase.user(authUser.user.uid).set({
		  username,
		  email,
		  roles,
		});
	  })
	  .then(() => {
	  	this.props.history.push(ROUTES.LANDING);
		return this.props.firebase.doSendEmailVerification();
	  })
	  .then(() => {
		this.setState({ ...INITIAL_STATE });
	  })
	  .catch(error => {
		if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
		  error.message = ERROR_MSG_ACCOUNT_EXISTS;
		}

		this.setState({ error });
	  });

	event.preventDefault();


	
  };

  onChange = event => {
	this.setState({ [event.target.name]: event.target.value });
  };

  render() {
	const {
	  username,
	  email,
	  passwordOne,
	  passwordTwo,
	  isAdmin,
	  error,
	} = this.state;

	const isInvalid =
	  passwordOne !== passwordTwo ||
	  passwordOne === '' ||
	  email === '' ||
	  username === '';

	return (
	  <Form onSubmit={this.onSubmit} class="form">
		<h1>Sign Up</h1>
		<input
		  name="username"
		  value={username}
		  onChange={this.onChange}
		  type="text"
		  placeholder="Full Name"
		/>
		<br/>
		<br/>        
		<input
		  name="email"
		  value={email}
		  onChange={this.onChange}
		  type="text"
		  placeholder="Email Address"
		/>
		<br/>
		<br/>
		<input
		  name="passwordOne"
		  value={passwordOne}
		  onChange={this.onChange}
		  type="password"
		  placeholder="Password"
		/>
		<br/>
		<br/>
		<input
		  name="passwordTwo"
		  value={passwordTwo}
		  onChange={this.onChange}
		  type="password"
		  placeholder="Confirm Password"
		/>
		<br/>
		<br/>
		<button class="ui button" disabled={isInvalid} type="submit">
		  Sign Up
		</button>
		{error && <p>{error.message}</p>}
	  </Form>
	);
  }
}

const SignUpLink = () => (
  <div class="forget">
	Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </div>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
