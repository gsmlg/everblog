import Backbone from 'backbone';

export default Backbone.Model.extend({
    idAttribute: 'guid',
    url: function() {
    	return '/notebooks/note/' + this.id;
    }
});