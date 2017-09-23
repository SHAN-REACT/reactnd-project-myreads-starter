import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI'

class ListBooks extends Component {
    state = {
        books : []
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
          this.setState({ books })
        });
    }

    render () {
        return <h1>List Books TBD</h1>
    }
}


export default ListBooks;