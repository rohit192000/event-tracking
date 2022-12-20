
exports.up = function(knex) {
    return knex.schema.createTable("event", function (table) {
      table.increments("id").primary();
        
      table.integer('category_id').unsigned().notNullable();
      table.foreign('category_id', "event_category_id").references('id').inTable('category').onUpdate('RESTRICT').onDelete("RESTRICT");

      table.text("title").notNullable();
      table.text("description").notNullable();
      table.string("image", 255).notNullable();
      table.datetime("start_date").notNullable();
      table.datetime("end_date").notNullable();

    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists("event");
  };
  
