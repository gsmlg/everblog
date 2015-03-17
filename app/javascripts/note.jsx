import React from 'react';

export default React.createClass({
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
