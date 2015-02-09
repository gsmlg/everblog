var NavForm = React.createClass({
  handleSubmit: function(e) {
    if (e) {
      e.preventDefault();
    }
    var name = this.refs.name.getDOMNode().value.trim();
    var link = this.refs.link.getDOMNode().value.trim();
    if (!name || !link) {
      return void(0);
    }
    this.props.navs.add({name: name, link: link});
  },
  render: function(){
    return (
      <form onSubmit={this.handleSubmit} className="form-horizontal">
        <div className="form-group">
          <label className="col-sm-2 control-label">Name</label>
          <div className="col-sm-10">
            <input type="text" ref="name" className="form-control" />
          </div>
        </div>
        <div className="form-group">
          <label className="col-sm-2 control-label">Link</label>
          <div className="col-sm-10">
            <input type="text" ref="link" className="form-control" />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-10 col-sm-offset-2">
            <input type="submit" value="Submit" className="btn btn-default" />
          </div>
        </div>
      </form>
    )
  }
});

export {NavForm};
