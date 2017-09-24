import React, {Component} from 'react';
import DebounceInput from 'react-debounce-input';
import * as BooksAPI from './BooksAPI';
import Book from './book';


class SearchBooks extends Component {

    state = {
        query : '',
        books : []
    }

    clearBooks = () => {
        this.setState({ books : [] });
    }

    updateQuery = (inputObj) => {
        if(inputObj.query.trim().length > 0) {
            this.setState({ query: inputObj.query.trim() });
            BooksAPI.search(this.state.query, 20)
               .then((books) => {
                   this.setState({ books });
               }).catch(err => {
                   console.log('Error:' + err);
                   this.clearBooks();
               });
        } else {
            this.clearBooks();
        }
    }

    render () {
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" href="/">Close</a>
              <div className="search-books-input-wrapper">
                <DebounceInput
                    minLength={3}
                    debounceTimeout={200}
                    placeholder="Search by title or author" 
                    onChange={event => this.updateQuery({query: event.target.value})} />
                </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {
                    this.state.books && this.state.books.length > 0 && this.state.books.map((book, index) => <Book key={index} book={book} />)
                }
              </ol>
            </div>
          </div>
        );
    }

}

export default SearchBooks;