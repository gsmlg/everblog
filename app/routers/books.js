var Router = require('express').Router;

var Books = require('../models/books');

var router = new Router();

router.route('/').get(function(req, res){
  Books.all({}).then(function(books){
    res.json(books);
  }, function(err){
    res.status(400).send(err);
  });

}).post(function(req, res){
  var book = req.body.book ? req.body.book : req.body;
  console.log(book);
  Books.create(book).then(function(book){
    res.json(book);
  }, function(err){
    res.status(400).send(err);
  });
});

router.route('/:id').put(function(req, res){

}).delete(function(req, res){

});

module.exports = router;
