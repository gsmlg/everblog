var Router = require('express').Router;

var Note = require('../models/evernote');

var router = new Router();

router.route('/').get(function(req, res) {
	Note.getNotebooks().then(function(data){
		res.json(data);
	}, function(e){
		res.status(400).json(e);
	});
});

router.route('/:notebook_guid').get(function(req, res) {
	Note.getNotesByNotebook().then(function(data){
		res.json(data);
	}, function(e){
		res.status(404).json(e);
	});
});

module.exports = router;
