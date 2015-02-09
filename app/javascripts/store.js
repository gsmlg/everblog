var Navs = Backbone.Collection.extend({

});

var TopNavs = Navs.extend({
  url: '/topnavs'
});

var topNavs = new TopNavs();

export default TopNavs;

export {topNavs};
