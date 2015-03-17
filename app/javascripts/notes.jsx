import React from 'react';

var NoteItem = React.createClass({
    render: function() {
        var note = this.props.note.toJSON();
        return (
            <section className="node-item">
            <a className="btn btn-raised btn-default" href={"/#note/"+note.guid}>
            {note.title}
            </a>
            </section>
        );
    }
});

var Notes = React.createClass({
    render: function(){
        var notes = this.props.notes.map(function(note){
            return (<NoteItem key={note.id} note={note} />);
        });
        return (
            <div className="note-list">
            {notes}
            </div>
        );
    }
});

export default Notes;
