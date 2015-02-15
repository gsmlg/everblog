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
  var book = req.body.book ? req.body.book : req.body;
  Books.update(req.params.id, book).then(function(book){
    res.json(book);
  }, function(error){
    res.status(400).send(error);
  });
}).delete(function(req, res){
  var id = req.params.id;
  Books.remove(id).then(function(num){
    if (num > 0)
      res.status(204).send(null);
    else
      res.status(404).send(null);
  }, function(error){
    res.status(400).send(error);
  });
});

module.exports = router;
