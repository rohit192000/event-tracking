exports.up = function (knex) {
  return knex.schema.createTable("userevents", (table) => {
    table.increments("id").primary();

    table.integer("event_id").unsigned().notNullable();
    table
      .foreign("event_id", "userevent_event_id")
      .references("id")
      .inTable("event")
      .onDelete("RESTRICT")
      .onUpdate("RESTRICT");

    table.integer("user_id").unsigned().notNullable();
    table
      .foreign("user_id", "userevent_user_id")
      .references("id")
      .inTable("users")
      .onDelete("RESTRICT")
      .onUpdate("RESTRICT");
  });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('userevents');
};
