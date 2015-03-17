import Backbone from 'backbone';
import Model from './note';

export default Backbone.Collection.extend({
    guid: 'this-is-not-a-guid',
    model: Model,
    setGUID: function(guid){
        if (this.guid === guid) return null;
        this.guid = guid;
        this.fetch({reset: true});
    },
    parse: function(data) {
        return data;
    },
    url: function(){
        var guid = this.guid ? '/' + encodeURIComponent(this.guid) : '';
        return '/notebooks' + guid + '/notes';
    }
});
