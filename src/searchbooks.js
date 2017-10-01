import React, {Component} from 'react';
import DebounceInput from 'react-debounce-input';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';
import Book from './book';

/**
 * Class responsible for providing search functionality.
 */
class SearchBooks extends Component {

    static propTypes = {
        books: PropTypes.array.isRequired,
        onUpdateBook: PropTypes.func.isRequired,
        onLoadEnd : PropTypes.func.isRequired,
        onLoadStart: PropTypes.func.isRequired
    }

    state = {
        query : '',
        matchingBooks : [],
        isLoading : false
    }

    /**
     * Updates the parent with the new chosen state.
     * @param {Object} book The book being acted upon
     * @param {String} newShelf The new shelf name
     */
    updateBook = (book, newShelf) => {
        this.props.onUpdateBook(book, newShelf);
    }

    /**
     * Resets the results to empty.
     */
    resetResults = () => {
        this.setState({ matchingBooks : [] });
    }

    /**
     * Sets the state with the new set of books matching the
     * search criteria.
     * @param {String} input The search criteria
     */
    search = (input) => {
        const { books } = this.props;
        if(input.query.trim().length > 0) {
            this.setState({ query: input.query.trim(), isLoading : true });
            this.props.onLoadStart();
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
                   this.props.onLoadEnd();
               }).catch(err => {
                   console.log('Error:' + err);
                   this.props.onLoadEnd();
                   this.resetResults();
               });
        } else {
            this.resetResults();
        }
    }

    /**
     * Displays the searchbox along with the results.
     * @override
     */
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
                    onChange={event => this.search({query: event.target.value})} autoFocus/>
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