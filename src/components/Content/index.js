import React, { Component } from 'react';
import { Grid, Image, Segment } from 'semantic-ui-react'
import axios from 'axios'

class Content extends Component {
	constructor() {
		super()
		this.state = {
			wish: [],
			post: [],
			list: [],
			activeItem: 0
		};
		this.detailClickHandler = this.detailClickHandler.bind(this);
    }

    componentWillReceiveProps(nextProps) {
    	if (nextProps.activeItem === 0) {
    		this.setState({ list: this.state.post })
    	} else {
    		this.setState({ list: this.state.wish })
    	}
    }


    componentDidMount() {
		var id = window.sessionStorage.getItem('userId');
		
		var user = 'https://rkproject.herokuapp.com/api/users/';
		var book = 'https://rkproject.herokuapp.com/api/books/';

		var tempName = []
		var tempBook = []
		axios.get(user + id).then((res) => {
			tempName = res.data.data.wishedBooks
			console.log(tempName);
			for (var i = 0; i < tempName.length; i++) {
				axios.get(book + tempName[i]).then((res) => {
					var bk = res.data.data
					console.log(bk);
					var p = (
                        <Grid.Column>
                        <Segment>
                        <Image onClick={() => this.detailClickHandler(bk._id)} src={bk.picture} />
                            <p>
                            Title: {bk.title}
                            <br/>
                            <br/>
                            College: {bk.college}
                            <br/>
                            <br/>
                            Description: {bk.description}
                            </p>
                        </Segment>
                        <br/>
                        </Grid.Column>
                    )
					this.setState({
						wish: [...this.state.wish, p]
					})
					console.log(this.state.wish);
					
				})
			}
			return tempBook;
		})

		axios.get(user + id).then((res) => {
			tempName = res.data.data.postedBooks

			for (var i = 0; i < tempName.length; i++) {
				axios.get(book + tempName[i]).then((res) => {
					var bk = res.data.data
					var p = (
                        <Grid.Column>
                        <Segment>
                        <Image onClick={() => this.detailClickHandler(bk._id)} src={bk.picture} />
                            <p>
                            Title: {bk.title}
                            <br/>
                            <br/>
                            College: {bk.college}
                            <br/>
                            <br/>
                            Description: {bk.description}
                            </p>
                        </Segment>
                        <br/>
                        </Grid.Column>
                    )
					this.setState({
						post: [...this.state.post, p],
						list: [...this.state.post, p]
					})
				})
			}
        })
    }

	detailClickHandler(value) {
        window.location.href = 'http://localhost:3000/details/' + value;
    }

    render() {
        return(
       	<div>
	        <Grid stackable columns={3}>
		        <Grid.Row>
		        {this.state.list}
		        </Grid.Row>
	    	</Grid>
	    </div>
    	)
    }
}

export default Content;