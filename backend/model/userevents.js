const bookshelf = require('./dbconfig');

const UserEvents = bookshelf.Model.extend(
    {
        tableName:'userevents',
        event: function() {
            return this.belongsTo('Event', 'event_id', 'id')
        },
        users() {
            return this.belongsTo('Users', 'user_id', 'id')
        }
    }
)

module.exports = bookshelf.model('UserEvents', UserEvents);