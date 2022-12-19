const bookshelf = require('./dbconfig');
const UserEvents = require('./userevents')
const Users = bookshelf.Model.extend(
    {
        tableName:'users',
        userevents: function() {
            return this.hasMany(UserEvents)
        }
    }
)

module.exports = bookshelf.model("Users", Users);