import dom from 'domReady';

import Backbone from 'backbone';
import React from 'react-with-addons';

var Notebook = Backbone.Model.extend({
    idAttribute: 'guid'
});

var Notebooks = Backbone.Collection.extend({
    model: Notebook,
    url: '/notebooks'
});

var Book = Backbone.Model.extend({
    idAttribute: '_id',
    toggleSelect: function() {
        this.set('selected', !this.get('selected'));
    }
});

var Books = Backbone.Collection.extend({
    model: Book,
    url: '/books',
    initialize: function() {
        this.on('change:selected', this.selectedChange, this);
    },
    selectedChange: function(model) {
        if (model.get('selected')) {
            this.chain().without(model).invoke('set', {selected: false});
        }
    },
    getSelected: function() {
        return this.findWhere({selected: true});
    }
});



var Header = React.createClass({
    componenetDidMount: function() {
        // this.props.notebooks.on('add remove reset', this.forceUpdate, this);
    },
    componenentWillUnmount: function() {
        // this.props.notebooks.off(null, null , this);
    },
    getInitialState: function(){
        return {};
    },
    render: function() {
        var menus = this.props.notebooks.map(function(notebook){
            notebook = notebook.toJSON();
            return (
                <li key={notebook.guid}>
                <a href={'#/notebooks/'+notebook.guid}>{notebook.name}<span className="sr-only">(current)</span></a>
                </li>)
        });
        return (
            <div className="navbar navbar-inverse">
            <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand">Home</a>
            </div>
            <div className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
            <li className="active"><a href="#">Books<span className="sr-only">(current)</span></a></li>
            {menus}
            </ul>
            </div>
            </div>
        );
    }
});



var BookList = React.createClass({
    render: function() {
        var books = this.props.books.map(function(book){
            return (<BookItem key={book.id} book={book} />);
        });
        return (
            <section className="book-list container-fluid row">
            {books}
            </section>
        );
    }
});

var SearchForm = React.createClass({
    handleSearch: function(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        var search = this.refs.search.getDOMNode().value.trim();
        if (!search) return null;
        this.props.searchHandler(search);
    },
    render: function() {
        return (
            <div className="SearchForm">
                <form onSubmit={this.handleSearch} className="form-inline" >
                    <div className="form-group">
                        <input ref="search" className="form-control" type="earch" placeholder="Search Books ... " />
                        <input className="btn btn-primary" type="submit" value="Search" />
                    </div>
                </form>
            </div>
        )
    }
});

var Book = React.createClass({
    render: function() {
        var book = this.props.book;
        return (
            <section>
                <header>
                <h3><a href={book.alt} title={book.alt_title}>{book.title}</a></h3>
                <h3><small title={book.author_intro}>Author: {book.author.join('; ')}</small></h3>
                <div>Rating: {book.rating.average}, mumRaters: {book.rating.numRaters}</div>
                </header>
                <div>
                    <img className="img-rounded" src={book.image} />
                </div>
            </section>
        );
    }
});

var ShowBooks = React.createClass({
    render: function() {
        var content = null, i, j, list, newList, data, itemPerRow, row;
        if (this.props.data && this.props.data.books) {
            data = this.props.data, books = data.books;
            list = books.map(function(book) {
                return (
                    <div key={book.id} className="col-md-3">
                        <Book book={book} />
                    </div>
                );
            }); 
            newList = [], itemPerRow = 4;
            for (i = 0, j = list.length; i < j; i += itemPerRow) {
                row = list.slice(i, i + itemPerRow);
                newList.push(
                    <div key={'row-'+(i/itemPerRow+1)} className="row">
                        {row}
                    </div>
                );
            }
            content = (
                <section >
                    <div>Total: {data.total}</div>
                    <div className="container-fluid">
                        {newList}
                    </div>
                </section>
            );
        }
        return (
            <section className="books">
                {content}
            </section>
        );
    }
});

var Home = React.createClass({
    componenetDidMount: function() {
        this.props.books.on('add remove reset', this.forceUpdate.bind(this), this);
        this.props.notebooks.on('add remove reset', this.forceUpdate, this);
    },
    componenentWillUnmount: function() {
        this.props.books.off(null, null , this);
        this.props.notebooks.off(null, null , this);
    },
    getInitialState: function() {
        return {showing: 'list', query_books: [], menus: []};
    },
    searchHandler: function(search) {
        var params = {
            q: search
        };
        $.ajax({
            dataType: 'jsonp',
            url: 'https://api.douban.com/v2/book/search',
            data: params
        }).then(function(data){
            this.setState({query_books: data});
        }.bind(this));
    },
    render: function() {
        return (
            <div className="Application">
            <Header notebooks={this.props.notebooks} />
            <div className="container">
            <div className="row">
                <SearchForm searchHandler={this.searchHandler} />
                <ShowBooks data={this.state.query_books} />
            </div>
            </div>
            </div>
        );
    }
});

var books = new Books();
var notebooks = new Notebooks();

window.books = books;
window.notebooks = notebooks;

var App = React.render(<Home books={books} notebooks={notebooks} />, document.body);

export default App;

books.fetch();
notebooks.fetch().then(function(){
    App = React.render(<Home books={books} notebooks={notebooks} />, document.body);
});
