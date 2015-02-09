import Navbar from './navbar';
import {NavForm} from './addModule';
import Router from './router';

import {topNavs} from './store';

var Home = React.createClass({
  componentWillMount: function () {

  },
  componentWillUnmount: function () {

  },
  getInitialState: function () {
    return {
      navs: [
      ]
    };
  },
  render: function () {
    var name = 'home';
    return (
      <div id="app" className="app">
        <Navbar navs={this.props.topNavs}/>
        <div className="container">
          <h1>This is {name}.</h1>
          <NavForm navs={this.props.topNavs} />
        </div>
      </div>
    );
  }
});

React.render(
  <Home
    topNavs={topNavs}
    />,
  document.body
);

export default Home;

Home.topNavs = topNavs;

Home.router = new Router();

Backbone.history.start();

Home.router.navigate('/', {trigger: true});
