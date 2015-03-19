import React from 'react';
import $ from 'jquery';

function setMedia() {
    $('en-media').each(i, el){
        var $el = $(el);
        var type = $el.attr('type');
        var hash = $el.attr('hash');
        if (/image/.test(type)) {
            var img = new Image();
            Image.hash = hash;
            Image.src = '/notebooks/resource/' + hash;
            $el.empty().append(img);
        }
    }
}

export default React.createClass({
    componentDidMount: function () {
        setMedia();
    },
    componentDidUpdate: function (prevProps, prevState) {
        setMedia();
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
