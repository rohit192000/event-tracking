
exports.up = function(knex) {
  return knex.schema.createTable("category", function (table) {
    table.increments("id").primary();

    table.string("name", 50).notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("category");
};
