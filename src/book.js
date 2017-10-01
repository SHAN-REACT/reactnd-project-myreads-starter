import React, {Component} from 'react';
import PropTypes from 'prop-types';

/**
 * Class represeting an individual Book.
 */
class Book extends Component {

    static propTypes = {
        onUpdateBook: PropTypes.func.isRequired
    }

    state = {
        selectedShelf : 'none'
    }

    /**
     * Update the parent with the new chosen state.
     * @param {Object} evt Default event object enclosing the target object.
     */
    onChangeHandler = (evt) => {
        this.setState({ selectedShelf : evt.target.value });
        this.props.onUpdateBook(this.props.book, evt.target.value);
    }

    /**
     * Sets the status of the book during initialzition.
     * @override
     */
    componentDidMount() {
        const shelf = this.props.book.shelf;
        if (shelf && shelf.length > 0) {
            this.setState({ selectedShelf : shelf });
        }
    }

    /**
     * Renders a Book.
     * @override
     */
    render() {
        return(<li>
                <div className="book">
                    <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                        <select value={this.state.selectedShelf} onChange={this.onChangeHandler}>
                            <option value="" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                    </div>
                    <div className="book-title">{this.props.book.title}</div>
                    <div className="book-authors">{this.props.book.authors}</div>
                </div>
            </li>);
    }
}

export default Book;