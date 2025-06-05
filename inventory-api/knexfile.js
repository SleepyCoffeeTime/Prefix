export default {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      port: 5432,
      user: 'inventory_user',
      database: 'inventorydb',
    },
    migrations: {
      directory: './migrations',
    },
  },
};
