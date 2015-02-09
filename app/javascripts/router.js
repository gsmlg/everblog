import {topNavs} from './store';

export default Backbone.Router.extend({
  routes: {
    '/': 'index',
    'alpha': 'alpha',
    'beta': 'beta',
    'omega': 'omega',
    'nabla': 'nabla'
  },
  index: function(){
    topNavs.add({name: 'alpha', link: '#alpha'});
  },
  alpha: function(){
    topNavs.add({name: 'beta', link: '#beta'});
  },
  beta: function(){
    topNavs.add({name: 'omega', link: '#omega'});
  },
  omega: function(){
    topNavs.add({name: 'nabla', link: '#nabla'});
  },
  nabla: function(){
    topNavs.each(function(m){ topNavs.remove(m); });
  }
});
