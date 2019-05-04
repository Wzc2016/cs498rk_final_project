import React, { Component } from 'react'
import './Post.scss'
import axios from 'axios'
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
// var cloudinary = require('cloudinary/lib/cloudinary')

const INITIAL_STATE = {
  title: '',
  college: '',
  price: 0,
  description: '',
  picture: ''
};




class Post extends Component {

  constructor() {
	super();
	this.state = { ...INITIAL_STATE };
	this.titleChangeHandler = this.titleChangeHandler.bind(this);
	this.collegeChangeHandler = this.collegeChangeHandler.bind(this);
	this.priceChangeHandler = this.priceChangeHandler.bind(this);
	this.descriptionChangeHandler = this.descriptionChangeHandler.bind(this);
	this.pictureChangeHandler = this.pictureChangeHandler.bind(this);
	this.clickHandler = this.clickHandler.bind(this);
  }

  titleChangeHandler(e) {
	this.setState({
	  title: e.target.value
	})
  }

  collegeChangeHandler(e) {
	this.setState({
	  college: e.target.value
	});
	// console.log(this.state.college);
	// console.log("this.state.college");
  }

  priceChangeHandler(e) {
	this.setState({
	  price: parseInt(e.target.value, 10)
	})
	// console.log(this.state.price);
  }

  descriptionChangeHandler(e) {
	this.setState({
	  description: e.target.value
	})
	// console.log(this.state.description);
  }

  pictureChangeHandler(e) {
  	console.log(e.target.value)
	this.setState({
		picture: e.target.value
	})
	// cloudinary.v2.uploader.upload('sample.png', 
 //    function(error, result) {console.log(result, error)});
  }

  clickHandler(e) {
  	let data = new FormData()
  	data.append('picture', this.state.picture);
  	data.append('title', this.state.title);
  	data.append('description', this.state.description);
  	data.append('price', this.state.price);
  	data.append('college', this.state.college);
  	data.append('assignedUser', window.sessionStorage.getItem('userId'));
	axios.post("https://rkproject.herokuapp.com/api/books", data)
	.then(function (response) {
	  console.log(response);
	})
	.catch(function (error) {
	  console.log(error);
	});

  }

  render() {
	return (
	  <div className="height100">
			<div className="height100">
			<img src = ''/>
			  <div className="inputField">
				<form className="ui form" action={process.env.PUBLIC_URL + "/account/books"} >
				  <div class="field">
					<label>Title</label>
					<input type="text" name="title" placeholder="Title" onChange={this.titleChangeHandler}/>
				  </div>
				  <div class="field">
					<label>College</label>
					<select  value={this.state.college} onChange={this.collegeChangeHandler} class="ui fluid dropdown">
					  <option>Choose..</option>

					<option value="College of Liberal Art and Science">College of Liberal Art and Science</option>
					<option value="College of Engineering">College of Engineering</option>
					<option value="College of Business">College of Business</option>
					<option value="College of Education">College of Education</option>
					<option value="College of Medicine">College of Medicine</option>
					<option value="College of Law">College of Law</option>
					</select>
				  </div>


				  <div class="field">
					<label>Price</label>
					<div class="ui labeled input">
					  <label for="amount" class="ui label">$</label>
					  <input onChange={this.priceChangeHandler} type="text" placeholder="Amount" id="amount" />
					</div>
				  </div>

				  <div id="textarea" class="ui reply form">
					<div class="field">
					  <label>Description</label>
					  <textarea onChange={this.descriptionChangeHandler}></textarea>
					</div>
				  </div>

				  <br/>

				  <div class="field">
					<label>Upload Picture</label>
					<input type="file" onChange={this.pictureChangeHandler} name="image" />
				  </div>


				  <br/>


				  <button type="submit" class="ui green button" onClick={this.clickHandler}>Post</button>
				  <button to={ROUTES.ACCOUNT} class="ui red button" >Cancel</button>
				</form>
			  </div>
		</div>
		</div>

	)
  }

}
export default Post
