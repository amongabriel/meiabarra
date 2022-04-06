require('dotenv').config({  
  path: process.env.NODE_ENV === "test" ? "development.env" : ".env"
})

const app = require('./config/customExpress');
const routes = require('./app/routes')
const PORT = process.env.PORT || 3000;
routes(app);

app.listen(PORT, function(){
  console.log(`Servidor rodando na porta ${PORT}.`);
});