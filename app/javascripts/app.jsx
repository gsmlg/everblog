import dom from 'domReady';
import material from 'material';
import ripple from 'ripples';
import Backbone from 'backbone';
import React from 'react';


import Note from './models/note';
import Notes from './models/notes';
import Notebooks from './models/notebooks';


var notebooks = new Notebooks();
var notes = new Notes();
var note = new Note();

import Main from './main';

var App = React.render(
    <Main
        note={note}
        notes={notes}
        notebooks={notebooks}
    />,
    document.body
);

import Router from './router';

notebooks.fetch({reset: true}).then(function(){
    jQuery.material.init();

    new Router({app: App});

    Backbone.history.start();

});

export default App;


