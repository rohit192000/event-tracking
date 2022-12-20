
exports.up = function(knex) {
  return knex.schema.createTable('subevents', (table) => {
    table.increments("id").primary();

    table.integer("event_id").unsigned().notNullable();
    table.foreign("event_id", "subevent_event_id").references("id").inTable("event").onDelete("RESTRICT").onUpdate("RESTRICT");

    table.integer("subcategory_id").unsigned().notNullable();
    table.foreign("subcategory_id", "subevent_subcategory_id").references("id").inTable("subcategory").onDelete("RESTRICT").onUpdate("RESTRICT");
})
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('subevents');
};
