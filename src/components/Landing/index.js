import React from 'react';
import {Input, Search, Grid, Image, Icon, Header, Menu, Dropdown, activeItem } from 'semantic-ui-react';
import GridTemp from './grid';
import Background from './image/backg.jpg';

var sectionStyle = {
	backgroundImage: `url(${Background})`
  };

class Landing extends React.Component {

	constructor(){
		super();
		this.state = {
			activeItem: 'Newly Added',
			category: ""
		}
		this.newHandleItemClick = this.newHandleItemClick.bind(this);
		this.mostHandleItemClick = this.mostHandleItemClick.bind(this);
		this.searchHandler = this.searchHandler.bind(this);
		this.categoryClickHandler = this.categoryClickHandler.bind(this);
	}

	newHandleItemClick() {
		this.setState({ activeItem: 'Newly Added' })
		// console.log("Parent page state: ", this.state.activeItem)
	}

	mostHandleItemClick() {
		this.setState({ activeItem: 'Most Viewed' })
		// this.render();
		// console.log("Parent page state: ", this.state.activeItem)
	}

	searchHandler(e) {
		this.setState({
			query: e.target.value
		})
		console.log(e.target.value)
	}

	categoryClickHandler(e) {
		this.setState({
			category: e
		})
	}

	render(){
		return (
			<div>
				<Menu pointing secondary size='big' stackable>
					<Dropdown item text='Category'>
						<Dropdown.Menu>
							<Dropdown.Item onClick={() => this.categoryClickHandler("")}>All</Dropdown.Item>
							<Dropdown.Item onClick={() => this.categoryClickHandler("College of Liberal Art and Science")}>College of Liberal Art and Science</Dropdown.Item>
							<Dropdown.Item onClick={() => this.categoryClickHandler("College of Engineering")}>College of Engineering</Dropdown.Item>
							<Dropdown.Item onClick={() => this.categoryClickHandler("College of Business")}>College of Business</Dropdown.Item>
							<Dropdown.Item onClick={() => this.categoryClickHandler("College of Education")}>College of Education</Dropdown.Item>
							<Dropdown.Item onClick={() => this.categoryClickHandler("College of Medicine")}>College of Medicine</Dropdown.Item>
							<Dropdown.Item onClick={() => this.categoryClickHandler("College of Law")}>College of Law</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>

					<Menu.Item
						name='Newly Added'
						onClick={this.newHandleItemClick}
						active={this.state.activeItem === 'Newly Added'}
					/>
					<Menu.Item
						name='Most Viewed'
						onClick={this.mostHandleItemClick}
						active={this.state.activeItem === 'Most Viewed'}
					/>
					<div  className = "center item">
			          <Input icon="search" placeholder="Title..." value={this.state.query} onChange={this.searchHandler} className="searchBar"/>
			    </div>
				</Menu>
				<GridTemp category={this.state.category} query={this.state.query} activeItem={this.state.activeItem} page={this.state.activeItem}/>
			</div>
		)
	}

};

export default Landing;
