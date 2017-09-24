import React from 'react';
import {Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import ListBooks from './listbooks';
import SearchBooks from './searchbooks';
import Loader from './common/loader';
import './App.css';

class BooksApp extends React.Component {

  state = {
    books : [],
    isLoading : false
  }

  onLoadStartHandler = () => {
    this.setState({ isLoading : true});
  }

  onLoadEndHandler = () => {
    this.setState({ isLoading :false});
  }

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

  resetBooks = () => {
    this.setState({ books : [] });
  }
  
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
