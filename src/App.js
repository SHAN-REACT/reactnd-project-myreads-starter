import React from 'react';
import {Route} from 'react-router-dom'
import ListBooks from './listbooks';
import SearchBooks from './searchbooks';
import './App.css';

class BooksApp extends React.Component {

  render() {
    return (
      <div className="app">
        <Route exact path='/' component={ListBooks}/>
        <Route exact path='/search' component={SearchBooks}/>
      </div>
    )
  }

}

export default BooksApp;
