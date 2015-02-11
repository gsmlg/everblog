// export default class Applicaton {
//   constructor(settings) {
//     this.settings = settings;
//   }
// }
import Navbar from './navbar';
import {NavForm} from './addModule';
import {topNavs} from './store';

var main = React.createClass({
    render: function(){
        return (
            <div className="container">
            <h1>This is {name}.</h1>
            <NavForm navs={this.props.topNavs} />
            </div>
        );
    }
})

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
        {this.props.main}
      </div>
    );
  }
});

export default React.render(
  <Home
    topNavs={topNavs}
    main={main}
    />,
  document.body
);


export {Home};
