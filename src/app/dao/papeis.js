const connection = require('./connection');
const { InternalServerError } = require('../utils/errors');

module.exports = {
  add: async papeis => {   //Retorna o uuid do usuário adicionado que é o campo informado para retorno no segundo parâmetro
    try {
      const result = await connection('papeis')
        .insert({
          uuid: papeis.uuid,
          lista: papeis.lista,
          data: papeis.data,
          operacao: papeis.operacao
        }, ["*"]);

      return result;
    } catch (error) {
      console.log(error)
      throw new InternalServerError("Erro durante inserção dos dados no banco de dados")
    }
  },

  update: async papeis => {  // Retorna o 1 se a transação de atualização funcionar corretamente e se não for especificado algum campo de retorno como no insert
    try {
      const result = await connection('papeis')
        .where('uuid', papeis.uuid)
        .update({
          lista: papeis.lista,
          data: papeis.data,
          operacao: papeis.operacao
        });

      return result;
    } catch (error) {
      throw new InternalServerError("Erro durante a atualização dos dados no banco de dados")
    }
  },

  findByUuid: async uuid => {   // Retorna o papeis se for encontrado
    try {
      const result = await connection('papeis')
        .where('uuid', uuid)
        .select('*')
        .first();
      return result;
    } catch (error) {
      throw new InternalServerError("Erro durante a busca no banco de dados")
    }
  },

  findByDateOperation: async (data, operacao) => {   // Retorna o papeis se for encontrado
    try {
      const result = await connection('papeis')
        .where('data', data)
        .where('operacao', operacao)
        .select('*')
        .first();

      return result;
    } catch (error) {
      throw new InternalServerError("Erro durante a busca no banco de dados")
    }
  },

  findAll: async () => {    // Retorna todos os papeis do banco
    try {
      const result = await connection('papeis')
        .select('*');

      return result;
    } catch (error) {
      throw new InternalServerError("Erro durante a busca no banco de dados")
    }
  },

  del: async papeis => {     // Retorna o número de linhas deletadas
    try {
      const result = await connection('papeis')
        .where('uuid', papeis.uuid)
        .del();

      return result;
    } catch (error) {
      throw new InternalServerError("Erro durante a transação no banco de dados")
    }
  }
};
