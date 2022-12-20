
exports.up = function(knex) {
  return knex.schema.createTable('subcategory', (table) => {
    table.increments("id").primary();

    table.integer("category_id").unsigned().notNullable();
    table.foreign("category_id", "subcategory_category_id").references("id").inTable("category")
    .onDelete("RESTRICT").onUpdate("RESTRICT");

    table.string("name", 255).notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('subcategory');
};

