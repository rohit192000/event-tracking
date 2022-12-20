
exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments("id").primary();
        
        table.string("name", 50).notNullable();
        table.string("email", 50).notNullable();
        table.string("contact", 50).notNullable();
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
