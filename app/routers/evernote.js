var Router = require('express').Router;

var Note = require('../models/evernote');
var conf = require('../models/config');

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
		res.json(data);
	}, function(e){
		res.status(400).json(e);
	});
});

module.exports = router;
