// Update with your config settings.
module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_SCHEMA
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `migrations`
    }
  },
  production: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_SCHEMA
    },
    pool: {
      min: 2,
      max: 10
    }
  }

};

// module.exports = {
//   staging: {
//     client: 'postgresql',
//     connection: {
//       database: 'my_db',
//       user: 'username',
//       password: 'password'
//     },
//     pool: {
//       min: 2,
//       max: 10
//     },
//     migrations: {
//       tableName: 'knex_migrations'
//     }
//   },
//   production: {
//     client: 'postgres',
//     connection: {
//       host: 'ec2-54-173-77-184.compute-1.amazonaws.com',
//       port: 5432,
//       user: 'vsqnofpecfpedb',
//       password: '9af9d7a6a7841d914ac3a16ffda0d4b862b71f552d79c687a6f5a236faff2640',
//       database: 'dago3spqs1cs5a'
//     },
//     pool: {
//       min: 2,
//       max: 10
//     }
//   },
//   development: {
//     client: 'mysql',
//     connection: {
//       host: '127.0.0.1',
//       user: 'root',
//       password: 'amon1513',
//       database: 'meiabarra'
//     },
//     pool: {
//       min: 2,
//       max: 10
//     }
//   }

// };
