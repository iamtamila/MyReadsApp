import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Shelf from "./Shelf"

class Bookcase extends Component {
    
    componentDidMount = () => {
        this.props.onRefreshAllBooks();
    }
    //create shelves with its names
    updateShelves = () => {
        const newCurrent = {
            name: "Currently Reading",
            books: this.props.books.filter(book => book.shelf === 'currentlyReading')
        };
        const newWant = {
            name: "Want to Read",
            books: this.props.books.filter(book => book.shelf === "wantToRead")
        };
        const newRead = {
            name: "Read",
            books: this.props.books.filter(book => book.shelf === "read")
        };
        return ([newCurrent, newWant, newRead]);
    }
    render() {
        let shelves = [];
        if (this.props.books && this.props.books.length)
            shelves = this.updateShelves();
        return (
            <div className="app">
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">
                        <div>
                            {shelves && shelves.map((shelf) => (<Shelf
                                key={shelf.name}
                                shelf={shelf}
                                onChangeShelf={this.props.onChangeShelf}
                            />))}
                        </div>
                    </div>
                    <div className="open-search">
                        <Link to='/search'>Add a book</Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Bookcase;