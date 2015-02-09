// export default class Applicaton {
//   constructor(settings) {
//     this.settings = settings;
//   }
// }
import Navbar from './navbar';
import {NavForm} from './addModule';

var Home = React.createClass({
  componentWillMount: function () {

  },
  componentWillUnmount: function () {

  },
  getInitialState: function () {
    return {};
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

export default Home;
