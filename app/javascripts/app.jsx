import Navbar from './navbar';
import {NavForm} from './addModule';
import Router from './router';
import {topNavs} from './store';
import Home from './application';

var App = {};

App.Home = Home;

App.topNavs = topNavs;

App.router = new Router();

Backbone.history.start();

App.router.navigate('/', {trigger: true});

topNavs.add({name: 'books', link: '#books'});

export default App;
