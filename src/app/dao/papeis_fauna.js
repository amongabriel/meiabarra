const connection = require('./connection');
const { InternalServerError } = require('../utils/errors');

const faunadb = require('faunadb');
const FaunaError = require('../utils/FaunaError.js');

// We do this so that our FQL code is cleaner
const {
  Update,
  Match,
  Delete,
  Ref,
  Index,
  Casefold,
  Filter,
  Let,
  Create,
  Var,
  And,
  Equals,
  Select,
  Collection,
  Map,
  Paginate,
  Documents,
  Get,
  Lambda } = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNA_SERVER_SECRET
});

module.exports = {

  add: async papeis => {

    try {

      // Create a new user document with credentials
      const result = await client.query(
        Create(
          Collection('operacoes'),
          {
            data: papeis
          }
        )
      );

      // Return the created document
      return result;

    } catch (error) {
      console.log(error)
      throw new FaunaError(error);
    }
  },


  update: async papeis => {  // Retorna o 1 se a transação de atualização funcionar corretamente e se não for especificado algum campo de retorno como no insert
    try {

      // Create a new user document with credentials
      const document = await client.query(
        Get(
          Match(
            Index('operacoes_by_uuid'),
            Casefold(papeis.uuid)
          )
        )
      );

      const updated = await client.query(
        Update(
          document.ref,
          {
            data: {
              lista: papeis.lista,
              data: papeis.data,
              operacao: papeis.operacao
            }
          },
        )
      );

      // Return the created document
      return updated.data;

    } catch (error) {
      console.log(error)
      throw new FaunaError(error);
    }
  },

  findByUuid: async uuid => {   // Retorna o papeis se for encontrado

    try {
      // Create a new user document with credentials
      const document = await client.query(
        Get(
          Match(
            Index('operacoes_by_uuid'),
            Casefold(uuid)
          )
        )
      );

      const result = document.data
      // Return the created document
      return result;

    } catch (error) {
      console.log(error)
      throw new FaunaError(error);
    }
  },


  findByDateOperation: async (data, operacao) => {   // Retorna o papeis se for encontrado
    try {

      // Create a new user document with credentials
      const documents = await client.query(
        Map(
          Paginate(
            Filter(
              Documents(
                Collection('operacoes')),
              Lambda('x', Let({ doc: Get(Var('x')) },
                And(
                  Equals(
                    Select(
                      ['data', 'data'],
                      Var('doc'), null),
                    data),
                  Equals(
                    Select(
                      ['data', 'operacao'],
                      Var('doc'),
                      null),
                    operacao
                  )
                )
              )
              )
            )
          ),
          Lambda('x', Get(Var('x'))))
      );

      const result = documents.data.map(item => item.data)

      // Return the created document
      if (result.length > 0) {
        return result[0];
      }
      return null;

    } catch (error) {
      console.log(error)
      throw new FaunaError(error);
    }
  },

  findAll: async () => {    // Retorna todos os papeis do banco

    try {

      // Create a new user document with credentials
      const documents = await client.query(
        Map(
          Paginate(
            Documents(
              Collection('operacoes')
            )
          ),
          Lambda(x => Get(x))
        )
      );

      const result = documents.data.map(item => item.data)

      // Return the created document
      return result;

    } catch (error) {
      console.log(error)
      throw new FaunaError(error);
    }
  },

  del: async papeis => {     // Retorna o número de linhas deletadas
    try {

      const document = await client.query(
        Get(
          Match(
            Index('operacoes_by_uuid'),
            Casefold(papeis.uuid)
          )
        )
      );

      const result = await client.query(
        Delete(document.ref)
      );

      // Return the created document
      return result.data;

    } catch (error) {
      console.log(error)
      throw new FaunaError(error);
    }
  }
};
