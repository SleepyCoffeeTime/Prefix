export function up(knex) {
    return knex.schema.createTable('users', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').unique().notNullable();
      table.string('password_hash').notNullable();
      table.timestamps(true, true);
    });
  }
  
  export function down(knex) {
    return knex.schema.dropTable('users');
  }
  
