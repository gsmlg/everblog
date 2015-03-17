import Backbone from 'backbone';
import Model from './notebook';

export default Backbone.Collection.extend({
    model: Model,
    url: '/notebooks'
});
