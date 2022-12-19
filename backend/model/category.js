const bookshelf = require('./dbconfig');
const SubCategory = require('./subCategory');
const Event = require('./event')

const Category = bookshelf.model("Category",{
    tableName : "category",
    subcategory() {
        return this.hasMany(SubCategory);
    },
    event() {
        return this.hasMany(Event);
    }
})

module.exports = Category;