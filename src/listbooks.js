import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI';
import Book from './book';

class ListBooks extends Component {
    state = {
        books : []
    }

    clearBooks = () => {
        this.setState({ books : [] });
    }

    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books });
        }).catch(err => {
            console.log('Error:' + err);
            this.clearBooks();
        });;
    }

    render () {
        const { books } = this.state;
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
                                    {currentlyReadingBooks.map( (book, index) => <Book key={index} book={book} />)}
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Want to Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    { wantToReadBooks.map( (book, index) => <Book key={index} book={book} />)}
                                </ol>
                            </div>
                        </div>
                        <div className="bookshelf">
                            <h2 className="bookshelf-title">Read</h2>
                            <div className="bookshelf-books">
                                <ol className="books-grid">
                                    {readBooks.map( (book, index) => <Book key={index} book={book} />)}
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