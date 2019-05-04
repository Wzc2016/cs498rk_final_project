import React, { Component } from 'react'

import './index.scss';

class CategoryPage extends Component {
	constructor() {
		super()
    	this.clickHandler = this.clickHandler.bind(this);
	}

	clickHandler(e, id) {
		
	}


	render() {

		return (
		<div>
			<div className="ui buttons" id="halfwidth" onclick={this.clickHandler(0)} >
				<button className="ui black button" id="block">
					All
				</button>
				<button className="ui red button" id="block" onclick={this.clickHandler(1)}>
					College of Engineering
				</button>
			</div>
			<br/>
			<div className="ui buttons" id="halfwidth">
				<button className="ui red button" id="block" onclick={this.clickHandler(2)} >
					College of Liberal Arts and Sciences
				</button>
				<button className="ui black button" id="block" onclick={this.clickHandler(3)} >
					Gies College of Business
				</button>
			</div>
			<br/>
			<div className="ui buttons" id="halfwidth">
				<button className="ui black button" id="block" onclick={this.clickHandler(4)} >
					College of Law
				</button>
				<button className="ui red button" id="block" onclick={this.clickHandler(5)} >
					College of Fine and Applied Arts
				</button>
			</div>
			<br/>
			<div className="ui buttons" id="halfwidth">
				<button className="ui red button" id="block" onclick={this.clickHandler(6)} >
					College of Education
				</button>
				<button className="ui black button" id="block" onclick={this.clickHandler(7)} >
					College of Applied Health Sciences
				</button>
			</div>
		</div>
		)
	}
}

export default CategoryPage;