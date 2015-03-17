import React from 'react';

var Header = React.createClass({
    componenetDidMount: function() {
    },
    componenentWillUnmount: function() {
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

export default Header;
