import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { Button, Card, Menu, Image} from 'semantic-ui-react';
import * as ROUTES from '../../constants/routes';
import Content from '../Content';
import './Account.scss'

import {
  AuthUserContext,
} from '../Session';

class PostPage extends Component {
	render() {
		return (
			<div>
				<Button basic color='red' as={Link} to={ROUTES.RESET}>
					Reset Password
				</Button>
				<Button basic color='green' as={Link} to={ROUTES.POST}>
					Post Book
				</Button>
			</div>
		)
	}
}

class AccountPage extends Component {
	constructor() {
		super();
		this.state = {
			activeItem: 0,
		}
		this.postHandler = this.postHandler.bind(this);
		this.wishHandler = this.wishHandler.bind(this);
	}
	postHandler() {
		this.setState({ activeItem : 0 })
	}

	wishHandler() {
		this.setState({ activeItem : 1 })
	}

	render() {
		return (
			<AuthUserContext.Consumer>
				{authUser => (
				  <div className="Container">
					<div className="UserCard">
					  <Card>
						<Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' />
						<Card.Content>
						  <Card.Header>Hi {authUser.username}</Card.Header>
						</Card.Content>
						<Card.Content extra>
						  <PostPage />
						</Card.Content>
					  </Card>
					</div>

					<div className="Dropdown">
					  <Menu tabular>
						<Menu.Item name='Posted Book' active={this.state.activeItem === 0} onClick={this.postHandler} />
						<Menu.Item name='Wished Book' active={this.state.activeItem === 1} onClick={this.wishHandler} />
					  </Menu>
					  <Content activeItem={this.state.activeItem} />
					</div>
				  </div>

				)}
			  </AuthUserContext.Consumer>			
		)
	}	
}


export default AccountPage;
