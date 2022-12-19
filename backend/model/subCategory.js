const bookshelf = require('./dbconfig');
const SubEvent = require('./subevent')
const SubCategory =  bookshelf.Model.extend({
    tableName: 'subcategory',  	
    category: function () { 
        return this.belongsTo('Category' ,'category_id','id');
    },
    subevent: function(){
        return this.hasMany(SubEvent)
    }
});

module.exports = bookshelf.model('SubCategory', SubCategory);