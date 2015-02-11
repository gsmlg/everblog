import {topNavs, books} from './store';
import Home from './application';
import Books from './books';
window.Books = Books;
export default Backbone.Router.extend({
  routes: {
    '/': 'index',
    'books': 'books'
  },
  index: function(){
    topNavs.add({name: 'alpha', link: '#alpha'});
  },
  books: function(){
    Books.setProps({books: books});
    Home.setProps({
      main: Books
    });
  }
});
