import React from 'react';
import Header from './header';
import Notes from './notes';
import Note from './note';

var Main = React.createClass({
    componentDidMount: function() {
        this.props.notes.on('add remove reset', function(){
            this.forceUpdate();
        }, this);
        this.props.notebooks.on('add remove reset', function() {
            this.forceUpdate();
        }, this);
        this.props.note.on('change sync', function(){
            this.forceUpdate();
        }, this);
    },
    componentWillUnmount: function() {
        this.props.notebooks.off(null, null , this);
        this.props.notes.off(null, null , this);
    },
    getInitialState: function() {
        return {showing: 'home'};
    },
    showHome: function() {
        this.setState({showing: 'home'});
    },
    showNotebook: function(name) {
        this.setState({showing: 'notebook'});
        var m = this.props.notebooks.findWhere({name: name});
        var guid = m ? m.id : m;
        this.props.notes.setGUID(guid);
    },
    showNote: function(id) {
        this.setState({showing: 'note'});
        this.props.note.id = id;
        this.props.note.attributes = {};
        this.props.note.fetch();
    },
    getHomePage: function() {
        var name = 'everblog';
        var txt = "This app publish evernote as blog. What you've wrote in your evernote, what should shows here.";
        return (
            <div className="home">
            <div className="jumbotron">
            <h1>{name.toUpperCase()}</h1>
            <p>{txt}</p>
            <p><a href="https://github.com/gsmlg/everblog" target="_blank" className="btn btn-primary btn-lg">Learn more</a></p>
            </div>
            </div>
            );
    },
    getNotebookPage: function() {
        return (
            <div className="row">
                <Notes notes={this.props.notes} />
            </div>
            );
    },
    getNotePage: function() {
        return (
            <div className="">
                <Note note={this.props.note} />
            </div>
            );
    },
    getMain: function() {
        switch (this.state.showing) {
            case 'note':
                return this.getNotePage();
            case 'notebook':
                return this.getNotebookPage();
            case 'home':
                return this.getHomePage();
        }
    },
    render: function() {
        var main = this.getMain(); 
        return (
            <div className="Application">
            <Header notebooks={this.props.notebooks} />
            <div className="container">
            {main}
            </div>
            </div>
        );
    }
});

export default Main;
