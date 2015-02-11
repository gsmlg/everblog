var Navs = Backbone.Collection.extend({

});

var TopNavs = Navs.extend({
  url: '/topnavs'
});

var topNavs = new TopNavs();

var Books = Backbone.Collection.extend({
  idAttribute: '_id',
  url: '/books'
});

var books = new Books();

export {topNavs, books};
