const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const SWAGGER_URL = process.env.SWAGGER_URL;
const URL = process.env.URL || 'localhost';

let options = {
  swaggerDefinition: {
    info: {
      description: 'Esta é a API base para interação com o robô Meia Barra.',
      title: 'Meia Barra - API base',
      version: '1.0.0',
    },
    host: SWAGGER_URL || URL + ':' + PORT,
    basePath: '/',
    produces: [
      "application/json"
    ],
    schemes: ['http', 'https'],
  },
  basedir: __dirname, //app absolute path
  files: ['../app/routes/*.js']

};
const app = express();
const expressSwagger = require('express-swagger-generator')(app);
expressSwagger(options);
app.use(express.json());                // Habilita a recepção de objetos json
app.use(cors())
module.exports = app;

