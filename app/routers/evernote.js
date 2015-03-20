var Router = require('express').Router;
var RSVP = require('rsvp');
var ins = require('util').inspect;
var _ = require('underscore');

var Note = require('../models/evernote');
var conf = require('../models/config');

var NoteService = require('../lib/evernote');
var noteService = new NoteService();
var enml = require('enml-js');

var isProd = require('../../environment').production;

var router = new Router();

router.route('/').get(function(req, res) {
	conf.getAllowedBooks().then(function(ids) {
		return Note.findNotebook({guid: {$in: ids}});
	}).then(function(data){
		res.json(data);
	}, function(e){
		res.status(400).json(e);
	});
});

// deprecate
router.route('/notes').get(function(req, res) {
    var guid = (req.params.guid || '').replace(/^\/+|\/+$/g, '');
	conf.getAllowedBooks().then(function(ids) {
		return Note.findNote({notebookGuid: {$in: ids}});
	}).then(function(data){
		res.json(data);
	}, function(e){
		res.status(400).json(e);
	});
});

router.route('/:guid/notes').get(function(req, res) {
    var guid = (req.params.guid || '').replace(/^\/+|\/+$/g, '');
	Note.findNote({notebookGuid: guid}).then(function(data){
		data = data.map(function(d){
			delete d.content;
			delete d.resources;
			return d;
		});
		res.json(data);
	}, function(e){
		res.status(400).json(e);
	});
});

router.route('/note/:guid').get(function(req, res) {
    var guid = (req.params.guid || '').replace(/^\/+|\/+$/g, '');
    Note.findOneNote({_id: guid}).then(function(note){
    	if (isProd && note.content) {
    		res.json(note);
    	} else {
		    noteService.getNote(guid, {
		        withContent: true,
		        withResourcesData: true,
		        withResourcesRecognition: true,
		        withResourcesAlternateData: true
		    }).then(function(note){
		    	note.content = enml.HTMLOfENML(note.content, note.resources);
		    	delete note.resources;
		    	var defer = Note.updateNote(note);
		    	return defer.then(function(){
		    		res.json(note);
		    	});
		    }).catch(function(e){
				res.status(400).send(ins(e) + "\n" + e.stack);
		    });
    	}
    }, function(e) {
		res.status(400).send(ins(e) + "\n" + e.stack);
    });
});

router.route('/resource/:hash').get(function(req, res) {
	var hash = (req.params.hash || '').replace(/^\/+|\/+$/g, '');
	Note.findOneResource({hash: hash}).then(function(resource){
		res.type(resource.mime)
		var data = toArr(resource.data._body);
		res.send(new Buffer(data));
	}).catch(function(){
		res.status(404).end();
	});
});

function toArr(obj){
	var arr = [];
	for (var i in obj) {
		if (Object.hasOwnProperty(obj, i))
			arr.push(obj[i]);
	}
	return arr;
}

module.exports = router;
