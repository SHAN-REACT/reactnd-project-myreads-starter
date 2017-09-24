import React from 'react';
import {Route} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import ListBooks from './listbooks';
import SearchBooks from './searchbooks';
import './App.css';

class BooksApp extends React.Component {

  state = {
    books : []
  }

  updateBook = (book, newShelf) => {
    const { books } = this.state;
    let matchingBooks = books.filter( (b, index) => b.id === book.id);
    if(matchingBooks && matchingBooks.length === 1) {
      matchingBooks[0].shelf = newShelf;
      this.setState({ books });
      BooksAPI.update(matchingBooks[0], newShelf)
        .then( (books) => console.log('Updated book status') )
        .catch(err => {
          console.log('Error:' + err);
          this.resetBooks();
        });
    } else {
      console.log('Book not found : ' + book.id +'..'+ book.shelf);
      books.push(book);
      BooksAPI.update(book, newShelf)
        .then( (books) => console.log('Added book') )
        .catch(err => {
          console.log('Error:' + err);
          this.resetBooks();
      });
    }
  }

  resetBooks = () => {
    this.setState({ books : [] });
  }
  
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
        this.setState({ books });
    }).catch(err => {
        console.log('Error:' + err);
        this.resetBooks();
    });
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (<ListBooks books={this.state.books} onUpdateBook={this.updateBook}/>)} />
        <Route path='/search' render={() => (<SearchBooks books={this.state.books} onUpdateBook={this.updateBook}/>)} />
      </div>
    )
  }

}

export default BooksApp;
