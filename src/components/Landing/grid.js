import React from 'react'
import { Grid, Image, Icon, Segment, Header } from 'semantic-ui-react'
import Image1 from './image/img1.png';
import Image2 from './image/img2.jpg';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import './grid.css';
class GridTemp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: this.props.page,
            activeItem: this.props.activeItem,
            query: this.props.query,
            category: this.props.category,
            list: []
        };
        this.detailClickHandler = this.detailClickHandler.bind(this);
    

        axios.get('https://rkproject.herokuapp.com/api/books').then(async (res) => {

            var temp = await res.data.data.sort((a, b) => {
                if(this.state.page == "Newly Added" && a.dateCreated > b.dateCreated) {
                    return -1;
                }
                if(this.state.page == "Newly Added" && a.dateCreated <= b.dateCreated) {
                    return 1;
                }
                if(this.state.page == "Most Viewed" && a.watchedUsers.length <= b.watchedUsers.length) {
                    return 1;
                }
                if(this.state.page == "Most Viewed" && a.watchedUsers.length > b.watchedUsers.length) {
                    return -1;
                }

            })

            var style = {
                width: 150,
                height: 200
            }

            this.setState({
                list: temp.map((book) => {
                    return (
                        <Grid.Column>
                        <Segment>
                        <Image style={style} onClick={() => this.detailClickHandler(book._id)} src={book.picture} />
                            <p class="text-center">
                            Title: {book.title}
                            <br/>
                            <br/>
                            College: {book.college}
                            <br/>
                            <br/>
                            Description: {book.description}
                            </p>
                        </Segment>
                        <br/>
                        </Grid.Column>
                        )
                })
            })
        })

        console.log(this.state.list);


    }

    componentWillReceiveProps(nextProps) {
        this.setState({
          page: nextProps.page,
          activeItem: nextProps.activeItem,
          query: nextProps.query,
          category: nextProps.category
        });
        var p = nextProps.query ? nextProps.query : "";
        var c = nextProps.category ? ', "college": ' + '"' + nextProps.category + '"': "";
        var q = 'https://rkproject.herokuapp.com/api/books?where={"title":{"$regex":"' + p + '", "$options": "i"}' + c + '}';
        // console.log(q);
        axios.get(q).then(async (res) => {

            var temp = await res.data.data.sort((a, b) => {
                if(this.state.page == "Newly Added" && a.dateCreated > b.dateCreated) {
                    return -1;
                }
                if(this.state.page == "Newly Added" && a.dateCreated <= b.dateCreated) {
                    return 1;
                }
                if(this.state.page == "Most Viewed" && a.watchedUsers.length <= b.watchedUsers.length) {
                    return 1;
                }
                if(this.state.page == "Most Viewed" && a.watchedUsers.length > b.watchedUsers.length) {
                    return -1;
                }

            })

            var style = {
                width: 150,
                height: 200
            }

            this.setState({
                list: temp.map((book) => {
                    return (
                        <Grid.Column>
                        <Segment>
                        <Image style={style} onClick={() => this.detailClickHandler(book._id)} src={book.picture} />
                            <p class="text-center">
                            Title: {book.title}
                            <br/>
                            <br/>
                            College: {book.college}
                            <br/>
                            <br/>
                            Description: {book.description}
                            </p>
                        </Segment>
                        <br/>
                        </Grid.Column>
                        )
                })
            })
        })
      }

      detailClickHandler(value) {
        window.location.href = 'http://localhost:3000/details/' + value;
      }

    render(){
        return(
        <Grid stackable columns={3}>
        {console.log("Child page state: ", this.state.page)}
        <Grid.Row>
        {this.state.list}
        </Grid.Row>
    </Grid>
    )
}
}

export default GridTemp