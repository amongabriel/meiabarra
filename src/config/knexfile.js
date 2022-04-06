// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: "./meiabarra.sqlite",
    },
    useNullAsDefault: true
  },
  production: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: 'amon1513',
      database: 'meiabarra'
    },
    pool: {
      min: 2,
      max: 10
    }
  }

};
