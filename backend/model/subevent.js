const bookshelf = require('./dbconfig');
const Event = require('./event')

const SubEvent = bookshelf.Model.extend({
    tableName : 'subevents',
    event: function(){
        return this.belongsTo(Event);
    },
    subcategory: function(){
        return this.belongsTo('SubCategory', "subcategory_id", "id")
    }
})

module.exports = bookshelf.model('SubEvent', SubEvent);
