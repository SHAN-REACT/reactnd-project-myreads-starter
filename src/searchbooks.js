import React, {Component} from 'react';
import DebounceInput from 'react-debounce-input';
import * as BooksAPI from './BooksAPI';
import Book from './book';


class SearchBooks extends Component {

    state = {
        query : '',
        matchingBooks : []
    }

    updateBook = (book, newShelf) => {
        this.props.onUpdateBook(book, newShelf);
    }

    resetResults = () => {
        this.setState({ matchingBooks : [] });
    }

    search = (input) => {
        const { books } = this.props;
        if(input.query.trim().length > 0) {
            this.setState({ query: input.query.trim() });
            BooksAPI.search(this.state.query, 20)
               .then((result) => {
                    for (let indexCount = 0; indexCount < result.length; indexCount++) {
                        let matchingBooks = books.filter( (b, index) => b.id === result[indexCount].id);
                        if(matchingBooks && matchingBooks.length === 1) {
                            result[indexCount] = matchingBooks[0];
                        } else {
                            result[indexCount].shelf = 'none';
                        }
                    }
                   this.setState({ matchingBooks : result});
               }).catch(err => {
                   console.log('Error:' + err);
                   this.resetResults();
               });
        } else {
            this.resetResults();
        }
    }

    render () {
        const { matchingBooks } = this.state;
        return (
            <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" href="/">Close</a>
              <div className="search-books-input-wrapper">
                <DebounceInput
                    minLength={3}
                    debounceTimeout={200}
                    placeholder="Search by title or author" 
                    onChange={event => this.search({query: event.target.value})} />
                </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {
                    matchingBooks && matchingBooks.length > 0 && matchingBooks.map((book, index) => <Book key={index} book={book}  onUpdateBook={this.updateBook} />)
                }
              </ol>
            </div>
          </div>
        );
    }

}

export default SearchBooks;