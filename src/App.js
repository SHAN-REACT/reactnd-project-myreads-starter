import React from 'react';
import {Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import ListBooks from './listbooks';
import SearchBooks from './searchbooks';
import Loader from './common/loader';
import './App.css';

/**
 * Class representing the starting point of the app.
 */
class BooksApp extends React.Component {

  state = {
    books : [],
    isLoading : false
  }

  /**
   * Turs ON the loading state to true, which is responsible
   * for showing the loading icon.
   */
  onLoadStartHandler = () => {
    this.setState({ isLoading : true});
  }

  /**
   * Turns OFF the loading state to false, which hides the
   * loading icon.
   */
  onLoadEndHandler = () => {
    this.setState({ isLoading :false});
  }

  /**
   * Update the state of the Book in UI and also 
   * sends the updated state to the server.
   */
  updateBook = (book, newShelf) => {
    const { books } = this.state;
    let matchingBooks = books.filter( (b, index) => b.id === book.id);
    if(matchingBooks && matchingBooks.length === 1) {
      matchingBooks[0].shelf = newShelf;
      this.setState({ books, isLoading : true });
      BooksAPI.update(matchingBooks[0], newShelf)
        .then( (books) => {
          console.log('Updated book status');
          this.setState({ isLoading : false});
        }).catch(err => {
          console.log('Error:' + err);
          this.setState({ isLoading : false});
          this.resetBooks();
        });
    } else {
      console.log('Book not found : ' + book.id +'..'+ book.shelf);
      this.setState({ isLoading : true});
      books.push(book);
      BooksAPI.update(book, newShelf)
        .then( (books) => { 
          console.log('Added book');
          this.setState({ isLoading : false});
        })
        .catch(err => {
          console.log('Error:' + err);
          this.setState({ isLoading : false});
          this.resetBooks();
      });
    }
  }

  /**
   * Resets the books to empty array.
   */
  resetBooks = () => {
    this.setState({ books : [] });
  }

  /**
   * Fetches the list of books from the server.
   * @override
   */
  componentDidMount() {
    this.setState({ isLoading : true});
    BooksAPI.getAll().then((books) => {
        this.setState({ books, isLoading : false});
    }).catch(err => {
        console.log('Error:' + err);
        this.setState({ isLoading : false});
        this.resetBooks();
    });
  }

  /**
   * Render either the books with different state page 
   * or the search page, depending on the path.
   * @override
   */
  render() {
    return (
      <div className="app">
        <Loader show={this.state.isLoading} />
        <Route exact path='/' render={() => (<ListBooks books={this.state.books} onUpdateBook={this.updateBook}/>)} />
        <Route path='/search' render={() => (<SearchBooks books={this.state.books} onUpdateBook={this.updateBook} onLoadEnd={this.onLoadEndHandler} onLoadStart={this.onLoadStartHandler} />)} />
      </div>
    )
  }

}

export default BooksApp;
