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
    render: function() {
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
            </ul>
            </div>
            </div>
        );
    }
});

var BookForm = React.createClass({
    componentDidMount: function() {
        if (this.props.book) {
            this.setState(this.props.book.toJSON());
        }
    },
    onSubmit: function(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        var title = this.refs.title.getDOMNode().value.trim();
        var author = this.refs.author.getDOMNode().value.trim();
        if (!title || !author) {
            return void(0);
        } else {
            this.props.handleSubmit({title: title, author: author}, this.props.book);
        }
    },
    render: function() {
        var book = {}
        if (this.props.book) {
            book = this.props.book.toJSON();
        }

        var submit = (this.props.book && !this.props.book.isNew()) ? 'Update' : 'Create';
        return (
            <form onSubmit={this.onSubmit} className="form-horizontal">
            <div className="form-group">
            <label htmlFor="inputBookTitle" className="col-sm-2 control-label">Title :</label>
            <div className="col-sm-10">
            <input ref='title' defaultValue={book.title} type="text" className="form-control" id="inputBookTitle" placeholder="Book Title ..." />
            </div>
            </div>
            <div className="form-group">
            <label htmlFor="inputAuthor" className="col-sm-2 control-label">Author :</label>
            <div className="col-sm-10">
            <input ref='author' defaultValue={book.author} type="text" className="form-control" id="inputAuthor" placeholder="Book Author ..." />
            </div>
            </div>
            <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-default">{submit}</button>
            </div>
            </div>
            </form>
        );
    }
});

var BookItem = React.createClass({
    componentDidMount: function() {
        this.props.book.on('change', function(book){
            this.forceUpdate();
        }, this);
    },
    componentWillUnmount: function() {
        this.props.book.off(null, null, this);
    },
    getInitialState: function() {
        return {};
        // return this.props.book.toJSON();
    },
    handleSelect: function(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        this.props.book.toggleSelect();
    },
    render: function() {
        var book = this.props.book;
        return (
            <div className="col-md-3">
            <section className={"book-item" + (book.get('selected') ? ' selected' : '')}>
            <header>
            <h3>{book.get('title')}</h3>
            <span>{book.get('author')}</span>
            </header>
            <button onClick={this.handleSelect}>Select</button>
            </section>
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


var Home = React.createClass({
    componenetDidMount: function() {
        this.props.books.on('add remove reset', this.forceUpdate.bind(this), this);
    },
    componenentWillUnmount: function() {
        this.props.books.off(null, null , this);
    },
    getInitialState: function() {
        return {showing: 'list'};
    },
    handleShowing: function(state) {
        this.setState({showing: state});
    },
    handleCreate: function(formData, model) {
        this.props.books.create(formData, {wait: true});
    },
    handleEdit: function(formDate, model) {
        model.save(formDate, {wait: true});
    },
    handleRemove: function(formDate, model) {
        model.destroy({wait: true});
    },
    getShowing: function() {
        switch (this.state.showing) {
        case 'loading':
            return (<div className='contaner'><h2>Loading ... </h2></div>);
            break;
        case 'add':
            return (<BookForm handleSubmit={this.handleCreate} />);
            break;
        case 'edit':
            var book = this.props.books.getSelected();
            if (book)
                return (<BookForm book={book} handleSubmit={this.handleEdit} />);
            else
                return (<BookList books={this.props.books} />);
            break;
        case 'delete':
            var book = this.props.books.getSelected();
            if (book)
                return (<BookForm book={book} handleSubmit={this.handleRemove} />);
            else
                return (<BookList books={this.props.books} />);
            break;
        case 'list':
            return (<BookList books={this.props.books} />);
            break;
        }
    },
    render: function() {
        var navs = ['list', 'add', 'edit', 'delete'].map(function(nav){
            return (
                <li key={nav} className={this.state.showing == nav ? 'active' : ''}>
                <a href={'#'+nav} onClick={this.handleShowing.bind(this, nav)}>{nav.toUpperCase()}</a>
                </li>
            );
        }.bind(this));
        return (
            <div className="Application">
            <Header />
            <div className="container">
            <div className="row">
            <div className="col-md-3">
            <nav>
            <ul className="nav nav-pills nav-stacked">
            {navs}
            </ul>
            </nav>
            </div>
            <div className="col-md-9">
            {this.getShowing()}
            </div>
            </div>
            </div>
            </div>
        );
    }
});

var books = new Books();

window.books = books;

var App = React.render(<Home books={books} />, document.body);

export default App;

books.on('request', function(){
    App.setState({showing: 'loading'});
});

books.on('sync error', function(){
    App.setState({showing: 'list'});
});

books.fetch();
