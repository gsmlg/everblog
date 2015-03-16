import dom from 'domReady';
import material from 'material';
import ripple from 'ripples';
import Backbone from 'backbone';
import React from 'react';

var NoteModel = Backbone.Model.extend({
    idAttribute: 'guid'
});

var NotesModel = Backbone.Collection.extend({
    guid: 'this-is-not-a-guid',
    model: NoteModel,
    setGUID: function(guid){
        if (this.guid === guid) return null;
        this.guid = guid;
        this.fetch({reset: true});
    },
    parse: function(data) {
        return data;
    },
    url: function(){
        var guid = this.guid ? '/' + encodeURIComponent(this.guid) : '';
        return '/notebooks' + guid + '/notes';
    }
});

var Notebook = Backbone.Model.extend({
    idAttribute: 'guid'
});

var Notebooks = Backbone.Collection.extend({
    model: Notebook,
    url: '/notebooks'
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
                <a href={'#/notebooks/'+notebook.name}>
                    {notebook.name}
                    <span className="sr-only">(current)</span>
                </a>
                </li>
            );
        });
        return (
            <div className="navbar navbar-inverse">
                <div className="navbar-header">
                    <button
                        type="button"
                        className="navbar-toggle collapsed"
                        data-toggle="collapse"
                        data-target="#bs-example-navbar-collapse-1">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="/#">Everblog</a>
                </div>
                <div className="navbar-collapse collapse">
                    <ul className="nav navbar-nav">
                    {menus}
                    </ul>
                </div>
            </div>
        );
    }
});

var Note = React.createClass({
    render: function() {
        var note = this.props.note.toJSON();
        return (
            <section className="col-md-4">
                <h4 data-guid={note.guid} >{note.title}</h4>
            </section>
        );
    }
});

var Notes = React.createClass({
    render: function(){
        var notes = this.props.notes.map(function(note){
            return (<Note key={note.id} note={note} />);
        });
        return (
            <div className="note-list">
            {notes}
            </div>
        );
    }
});

var Home = React.createClass({
    componentDidMount: function() {
        this.props.notes.on('add remove reset', function(){
            this.forceUpdate();
        }, this);
        this.props.notebooks.on('add remove reset', function() {
            this.forceUpdate();
        }, this);
    },
    componentWillUnmount: function() {
        this.props.notebooks.off(null, null , this);
        this.props.notes.off(null, null , this);
    },
    getInitialState: function() {
        return {showing: 'list', query_books: [], menus: []};
    },
    setNotes: function(name) {
        var m = this.props.notebooks.findWhere({name: name});
        var guid = m ? m.id : m;
        this.props.notes.setGUID(guid);
    },
    render: function() {
        return (
            <div className="Application">
            <Header notebooks={this.props.notebooks} />
            <div className="container">
            <div className="row">
            <Notes notes={this.props.notes} />
            </div>
            </div>
            </div>
        );
    }
});

var notebooks = new Notebooks();
var notes = new NotesModel();

window.notebooks = notebooks;
window.notes = notes;

var App = React.render(
    <Home
        notes={notes}
        notebooks={notebooks}
    />,
    document.body
);

export default App;

var defer = notebooks.fetch({reset: true});

var NotebookRoute = Backbone.Router.extend({
    routes: {
        '': 'showNotebook',
        'notebooks/:name': 'showNotebook'
    },
    showNotebook: function(name) {
        defer.then(function(){ App.setNotes(name);});
    }
});

new NotebookRoute();

Backbone.history.start();



