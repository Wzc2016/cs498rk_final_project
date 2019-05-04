import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu} from 'semantic-ui-react'

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import './Navbar.scss'



const Navigation = () => (
  <AuthUserContext.Consumer>
	{authUser =>
	  authUser ? (
		<NavigationAuth authUser={authUser} />
	  ) : (
		<NavigationNonAuth />
	  )
	}
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
	<div className="ui container" id="navContainer">
		{/*<Menu pointing>
			<Menu.Item as={Link} to={ROUTES.LANDING}>
				<div id="logo">BOOOOK.COM</div>
			</Menu.Item>
			<Menu.Item as={Link} to={ROUTES.CATEGORY}>
				Category
			</Menu.Item>
			<Menu.Item as={Link} to={ROUTES.ACCOUNT}>
				Dashboard
			</Menu.Item>
			<Menu.Menu position="right">
			<Menu.Item>
				<Search className="searchBar"/>
			</Menu.Item>
			<Menu.Item>
				<SignOutButton />
			</Menu.Item>
			</Menu.Menu>
		</Menu>*/}

      <div className = "ui fixed inverted menu">
        <div className = "item" id="LogoContainer">
          <Link id="logo" to={ROUTES.LANDING}>BOOOOK .COM</Link>
        </div>
        {/* <div className = "item" id="hoverEffect">
          <Link to={ROUTES.CATEGORY}>Category</Link>
        </div> */}
        <div className = "item" id="hoverEffect">
          <Link to={ROUTES.ACCOUNT}>Dashboard</Link>
        </div>



        <div className = "right item" id="SignOut">
          <SignOutButton />
        </div>
      </div>
	</div>
);

const NavigationNonAuth = () => (
	<div className="ui container" id="navContainer">
    <div className = "ui fixed inverted menu">
      <div className = "item" id="LogoContainer">
        <Link id="logo" to={ROUTES.LANDING}>BOOOOK .COM</Link>
        {/*<div id="logo" as={Link} to={ROUTES.LANDING}></div>*/}
      </div>

          <div className = "right item" id="hoverEffect">
          <Link to={ROUTES.SIGN_IN}>Sign In</Link>
            {/*<div id="logo" as={Link} to={ROUTES.SIGN_IN}>Sign In</div>*/}
          </div>
    </div>




{/*
		<Menu pointing>
			<Menu.Item as={Link} to={ROUTES.LANDING}>
				<div id="logo">BOOOOK.COM</div>
			</Menu.Item>

			<Menu.Menu position="right">
			<Menu.Item as={Link} to={ROUTES.SIGN_IN}>
				Sign In
			</Menu.Item>
			</Menu.Menu>
		</Menu>
*/}
	</div>

);

export default Navigation;
