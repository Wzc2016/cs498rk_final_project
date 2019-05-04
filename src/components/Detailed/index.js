import React from 'react';
import {ButtonGroup, Button, Container, Card, Icon, Image } from 'semantic-ui-react';
import Image1 from '../Landing/image/img1.png';
import './Detailed.scss';
import axios from 'axios'


class Detailed extends React.Component {

    constructor(){
        super();
        this.state = {
        activeItem: 'General',
        price: 0,
        title: '',
        college: '',
        description: '',
        assignedUser: '',
        owner: '',
        watchedUser: 0,
        picture: '',
        buttonName: 'BUY with one click!',
        email: ''
    };
    this.buyClickHandler = this.buyClickHandler.bind(this);
    this.watchClickHandler = this.watchClickHandler.bind(this);
    this.unwatchClickHandler = this.unwatchClickHandler.bind(this);
    }


    buyClickHandler() {
        axios.delete('https://rkproject.herokuapp.com/api/books/' + this.props.match.params.id).then(() => {
            window.location.href = 'http://localhost:3000';
        })
    }

    unwatchClickHandler() {
        axios.get('https://rkproject.herokuapp.com/api/books/' + this.props.match.params.id).then((res) => {
            var temp = res.data.data;
            temp.watchedUsers = new Set(temp.watchedUsers);
            temp.watchedUsers.delete(window.sessionStorage.getItem('userId'));
            temp.watchedUsers = [...temp.watchedUsers];
            axios.put('https://rkproject.herokuapp.com/api/books/' + this.props.match.params.id, temp).then(() => {
                this.componentDidMount();
            });
        })

        axios.get('https://rkproject.herokuapp.com/api/users/' + window.sessionStorage.getItem('userId')).then((res) => {
            var temp = res.data.data;
            temp.wishedBooks = new Set(temp.wishedBooks);
            temp.wishedBooks.delete(this.props.match.params.id);
            temp.wishedBooks = [...temp.wishedBooks];
            axios.put('https://rkproject.herokuapp.com/api/users/' + window.sessionStorage.getItem('userId'), temp);
        })
    }

    watchClickHandler() {
        axios.get('https://rkproject.herokuapp.com/api/books/' + this.props.match.params.id).then((res) => {
            var temp = res.data.data;
            temp.watchedUsers = new Set(temp.watchedUsers);
            temp.watchedUsers.add(window.sessionStorage.getItem('userId'));
            temp.watchedUsers = [...temp.watchedUsers];
            // console.log(temp.watchedUsers);
            axios.put('https://rkproject.herokuapp.com/api/books/' + this.props.match.params.id, temp).then(() => {
                this.componentDidMount();
            });
        })

        axios.get('https://rkproject.herokuapp.com/api/users/' + window.sessionStorage.getItem('userId')).then((res) => {
            var temp = res.data.data;
            temp.wishedBooks = new Set(temp.wishedBooks);
            temp.wishedBooks.add(this.props.match.params.id);
            temp.wishedBooks = [...temp.wishedBooks];
            axios.put('https://rkproject.herokuapp.com/api/users/' + window.sessionStorage.getItem('userId'), temp);
        })
    }

	handleItemClick = (e, { name }) => {
		this.setState({ activeItem: name })
		// console.log("Parent page state: ", this.state.activeItem)
	}

    componentDidMount() {
        console.log(window.sessionStorage.getItem('name'))
        // console.log(this.props)
        axios.get('https://rkproject.herokuapp.com/api/books/' + this.props.match.params.id).then((res) => {
            this.setState({
                price: res.data.data.price,
                title: res.data.data.title,
                college: res.data.data.college,
                description: res.data.data.description,
                watchedUser: res.data.data.watchedUsers.length,
                picture: res.data.data.picture,
            });
            console.log(res.data.data)
            axios.get('https://rkproject.herokuapp.com/api/users/' + res.data.data.assignedUser).then((res2) => {
                this.setState({
                    owner: res2.data.data.name,
                    email: res2.data.data.email,
                    buttonName: res2.data.data._id == window.sessionStorage.getItem('userId') ? 'Delete this book':'BUY with one click!'
                })
                console.log(this.state.owner);
            })
        })
    }

	render(){
		return (
			<div>
                <Container textAlign='center'>
                <Card id='card'>
                    <Image src={this.state.picture} size='massive' />
                    <Card.Content>
                    <Card.Header>{this.state.title}</Card.Header>
                    <Card.Meta>
                        <span className='price'>Price: ${this.state.price}</span>
                    </Card.Meta>
                    <Card.Meta>
                        <span className='owner'>Owner: {this.state.owner}</span>
                    </Card.Meta>
                    <Card.Meta>
                        <span className='email'>Contact: {this.state.email}</span>
                    </Card.Meta>                    
                    <Card.Description>{this.state.description}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                    <a>
                        <Icon name='user' />
                        {this.state.watchedUser} Others want to purchase
                    </a>
                    </Card.Content>
                </Card>
                <br/>
                <ButtonGroup aria-label="Basic example">
                <Button color = "green" onClick={this.watchClickHandler}>
                 Watch this item!
                </Button>
                 <div class="or"></div>
                <Button color = "red" onClick={this.unwatchClickHandler}>
                 Unwatch this item!
                </Button>
                </ButtonGroup>
                <br/>
                <br/>
                <Button basic color = {this.state.buttonName === 'BUY with one click!' ? "green" : "red"} onClick={this.buyClickHandler}>
                 {this.state.buttonName}
                </Button>
                </Container>
			</div>
		)
	}
	
};

export default Detailed;