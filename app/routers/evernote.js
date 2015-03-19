var Router = require('express').Router;

var Note = require('../models/evernote');
var conf = require('../models/config');

var NoteService = require('../lib/evernote');
var noteService = new NoteService();

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
    	if (note.content) {
    		delete note.resources;
    		res.json(note);
    	} else {
		    noteService.getNote(guid, {
		        withContent: true,
		        withResourcesData: true,
		        withResourcesRecognition: true,
		        withResourcesAlternateData: true
		    }).then(function(note){
		    	var resources = note.resources;
		    	note.resources = null;
		    	var defer = Note.updateNote(note);
		    	resources.forEach(function(r){
		    		var hash = r.data.bodyHash;
		    		var hash = toArr(hash).map(function(i){
		    			return i.toString(16);
		    		}).join('');
		    		r._id = hash;
		    		r.hash = hash;
		    	});
		    	defer = defer.then(function(){
		    		Note.insertResource(resources);
		    	});
		    	res.json(note);
		    	return defer;
		    }).catch(function(e){
				res.status(400).json(e);
		    });
    	}
    }, function(e) {
		res.status(400).json(e);
    });
});

router.route('/resource/:hash').get(function(req, res) {
	var hash = (req.params.hash || '').replace(/^\/+|\/+$/g, '');
	Note.findOne({_id: hash}).then(function(resource){
		res.type(resource.mime)
		var data = toArr(resource.data._body);
		res.send(new Buffer(data));
	}).catch(function(){
		res.status(404).end();
	});
});

function toArr(obj){
	var arr = new Array();
	for (var i in obj) arr.push(obj[i]);
	return arr;
}

module.exports = router;
