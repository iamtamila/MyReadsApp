import React from 'react'
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI'
import * as BookUtils from './BookUtils';
import './App.css'
import Bookcase from './components/Bookcase';
import Search from './components/Search';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
       books: []
    }
 }

  componentDidMount = () => {
    if (this.state.newBook) {
      this.refreshAllBooks();
    }
  }

  refreshAllBooks = () => {
    // Get the books currently on the bookshelves and update the state with the returned, sorted list
    BooksAPI
      .getAll()
      .then((list) => {
        this.setState({
          books: BookUtils.sortAllBooks(list),
          newBook: false
        });
      });
  }

  changeShelf = (book, shelf) => {
    // Make the call to the service to update the shelf for the selected book to the
    // newly selected shelf
    BooksAPI.update(book, shelf)
      .then(response => {
        // Update the state of the book. Start with a copy of the list of books.
        book.shelf = shelf;
         this.setState(state => ({
            books: state.books.filter(b => b.id !== book.id).concat(book)
         }))
      })
  }

  render() {
    return (
      <div className="app">
        <Route
          exact
          path='/'
          render={(() => (<Bookcase
            books={this.state.books}
            onChangeShelf={this.changeShelf}
            onRefreshAllBooks={this.refreshAllBooks} />))} />
        <Route
          exact
          path='/search'
          render={(() => (<Search selectedBooks={this.state.books} onChangeShelf={this.changeShelf} />))} />

      </div>
    )
  }
}

export default BooksApp
