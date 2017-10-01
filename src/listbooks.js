import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Book from './book';

class ListBooks extends Component {
    
    static propTypes = {
        books: PropTypes.array.isRequired,
        onUpdateBook: PropTypes.func.isRequired
    }

    updateBook = (book, newShelf) => {
        this.props.onUpdateBook(book, newShelf);
    }

    render () {
        const { books } = this.props;
        let currentlyReadingBooks;
        let wantToReadBooks;
        let readBooks;

        if (books && books.length>0) {
            currentlyReadingBooks = books.filter( (book) => book.shelf === 'currentlyReading');
            wantToReadBooks = books.filter( (book) => book.shelf === 'wantToRead');
            readBooks = books.filter( (book) => book.shelf === 'read');
        } else {
            currentlyReadingBooks = [];
            wantToReadBooks = [];
            readBooks = [];
        }

        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Currently Reading</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {currentlyReadingBooks.map( (book, index) => <Book key={index} book={book} onUpdateBook={this.updateBook} />)}
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    { wantToReadBooks.map( (book, index) => <Book key={index} book={book} onUpdateBook={this.updateBook} />)}
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {readBooks.map( (book, index) => <Book key={index} book={book} onUpdateBook={this.updateBook} />)}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="open-search">
                    <a href="/search">Add a book</a>
                </div>
            </div>
        );
    }
}

export default ListBooks;