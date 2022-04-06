
const { InvalidArgumentError } = require('./errors');
module.exports = {
  notNull: (value, name) => {
    if (typeof value !== 'string' || value === 0)
      throw new InvalidArgumentError(`É necessário preencher o campo ${name}!`);
  },

  min: (value, name, min) => {
    if (value.length < min)
      throw new InvalidArgumentError(
        `O campo ${name} precisa ser maior que ${min} caracteres!`
      );
  },

  max: (value, name, max) => {
    if (value.length > max)
      throw new InvalidArgumentError(
        `O campo ${name} precisa ser menor que ${max} caracteres!`
      );
  }
};
