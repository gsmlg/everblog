import Backbone from 'backbone';



export default Backbone.Router.extend({
	initialize: function(options) {
		this.app = options.app;
	},
    routes: {
        '': 'showHome',
        'notebooks/:name': 'showNotebook',
        'note/:id': 'showNote'
    },
    showHome: function() {
    	this.app.showHome();
    },
    showNotebook: function(name) {
    	this.app.showNotebook(name);
    },
    showNote: function(id) {
    	this.app.showNote(id);
    }
});
