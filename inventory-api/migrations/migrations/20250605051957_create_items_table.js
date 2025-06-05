export function up(knex) {
    return knex.schema.createTable('items', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.text('description');
      table.integer('quantity').notNullable().defaultTo(0);
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.timestamps(true, true);
    });
  }
  
  export function down(knex) {
    return knex.schema.dropTableIfExists('items');
  }
  