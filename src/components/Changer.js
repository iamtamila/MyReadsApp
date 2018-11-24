import React, { Component } from 'react'
class Changer extends Component {
    state = {
        shelfSelection: this.props.book.shelf || "none"
    }
    onChangeShelf = (book, shelf) => {
        this.setState({ shelfSelection: shelf });
        this.props.onChangeShelf(book, shelf);
    }
    componentWillReceiveProps = (props) => {
        this.props = props;
        this.setState({ shelfSelection: this.props.book.shelf });
    }
    render = () => {
        return (
            <div className="book-shelf-changer">
                <select
                    value={this.state.shelfSelection}
                    onChange={(e) => this.onChangeShelf(this.props.book, e.target.value)}>
                    <option value="" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        )
    }
}

export default Changer;