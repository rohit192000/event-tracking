const bookshelf = require('./dbconfig');
const SubEvent = require('./subevent');

const Event =  bookshelf.Model.extend({
    tableName: 'event',  	
    category: function () { 
        return this.belongsTo('Category' ,'category_id','id');
    },
    subevent: function(){
        return this.hasMany('SubEvent')
    },
    userevents: function() {
        return this.hasMany('UserEvents')
    }
});
module.exports = bookshelf.model('Event', Event);