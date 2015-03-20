import React from 'react';
import $ from 'jquery';

export default React.createClass({
    componentDidMount: function () {
    },
    componentDidUpdate: function (prevProps, prevState) {
    },
    render: function() {
        var note = this.props.note.toJSON();
        return (
            <section className="node-item">
            <header>
            <h1>{note.title}</h1>
            </header>
            <div dangerouslySetInnerHTML={{__html: note.content || ""}} />
            </section>
        );
    }
});
