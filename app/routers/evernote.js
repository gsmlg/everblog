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

router.route('/notes').get(function(req, res) {
    var guid = (req.params.guid || '').replace(/^\/+|\/+$/g, '');
	Note.getNotesByNotebook(guid).then(function(data){
		res.json(data);
	}, function(e){
		res.status(400).json(e);
	});
});

router.route('/:guid/notes').get(function(req, res) {
    var guid = (req.params.guid || '').replace(/^\/+|\/+$/g, '');
	Note.getNotesByNotebook(guid).then(function(data){
		res.json(data);
	}, function(e){
		res.status(400).json(e);
	});
});

module.exports = router;
