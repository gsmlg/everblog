var appName = "Home";

var Nav = React.createClass({
  componentDidMount: function(){
    this.setState(this.props.nav.toJSON());
    this.props.nav.on('change', function(){
      this.setState(this.props.nav.toJSON());
    }, this);
  },
  getInitialState: function() {
    return {};
  },
  render: function(){
    return (
      <li ref="li" className={this.state.active ? 'active' : ''}>
        <a href={this.state.link}>{this.state.name}</a>
      </li>
    );
  }
});

var Navs = React.createClass({
  render: function(){
    var navs = this.props.navs.map(function(nav){
      return (
        <Nav nav={nav} />
        );
    });
    return (
      <ul className="navbar-nav nav">
        {navs}
      </ul>
    );
  }
});

var Navbar = React.createClass({
  componentDidMount: function(){
    this.props.navs.on('add remove', this.forceUpdate.bind(this, null));
  },
  render: function(){
    return (
      <nav className="navbar navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand">{appName}</a>
          </div>
          <div className="navbar-collapse">
            <Navs navs={this.props.navs} />
          </div>
        </div>
      </nav>
    );
  }
});

export default Navbar;
