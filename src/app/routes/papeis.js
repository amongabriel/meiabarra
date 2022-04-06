const PapeisController = require('../controllers/papeis');

module.exports = app => {
  app
    .route('/api/papeis')
    .post(PapeisController.create)
    .put(PapeisController.update)
    .get(PapeisController.findAll);

  app.route('/api/papeis/data-operacao')
    .get(PapeisController.findByDateOperation);

  app
    .route('/api/papeis/:uuid')
    .get(PapeisController.findOne)
    .delete(PapeisController.del);

}

/**
 * @typedef Papeis
 * @property {string} uuid - Identificador do papeis - eg: 710b962e-041c-11e1-9234-0123456789ab
 * @property {string} lista - Lista de papeis separado por vírgula - eg: BBAS3,GOLL4,BOVA11
 * @property {string} operacao - Tipo de operação: Compra ou Venda - eg: compra
 * @property {date} data - Data para operação com os papeis - eg: 01/01/2020
 */

/**
 * @typedef Papeis_dto
 * @property {string} lista - Lista de papeis separado por vírgula - eg: BBAS3,GOLL4,BOVA11
 * @property {string} operacao - Tipo de operação: Compra ou Venda - eg: compra
 * @property {date} data - Data para operação com os papeis - eg: 01/01/2020
 */


/**
 *
 * Cadastro de novos papeis
 * @route POST /api/papeis
 * @group Papeis 
 * @returns {object} 201 - Cadastro realizado com sucesso.
 * @returns {Error} 422 - Quando os parâmetros não forem informados corretamente
 * @returns {Error} 500 - Quando houver algum erro durante o processamento da transação
 * @param {Papeis_dto.model} Papeis.body.required -
 * @produces application/json
 * @consumes application/json
 */
/**
 * Atualização de dados dos papeis
 * @route PUT /api/papeis
 * @group Papeis
 * @returns {object} 201 - Cadastro atualizado com sucesso.
 * @returns {Error} 401 - Falha de autenticação.
 * @returns {Error} 422 - Quando os parâmetros não forem informados corretamente
 * @returns {Error} 500 - Quando houver algum erro durante o processamento da transação
 * @param {Papeis.model} Papeis.body.required -
 * @produces application/json
 * @consumes application/json
 */
/**
 * Listagem de papeis por data e operação.
 * @route GET /api/papeis/data-operacao
 * @group Papeis
 * @returns {Array.<Papeis>} 200 - Retorna a lista de papeiss pesquisados.
 * @returns {Error} 401 - Falha de autenticação.
 * @returns {Error} 404 - Quando não houverem papeiss cadastrados.
 * @returns {Error} 500 - Quando há algum erro durante o processamento da transação.
 * @param {string} data.query.required - data no formato dd/mm/yyyy - eg: 01/01/2020
 * @param {string} operacao.query.required - operacao - eg: compra
 * @produces application/json
 */
/**
 * Listagem de papeis.
 * @route GET /api/papeis
 * @group Papeis
 * @returns {Array.<Papeis>} 200 - Retorna a lista de papeiss pesquisados.
 * @returns {Error} 401 - Falha de autenticação.
 * @returns {Error} 404 - Quando não houverem papeiss cadastrados.
 * @returns {Error} 500 - Quando há algum erro durante o processamento da transação.
 * @produces application/json
 */
/**
 * Busca de informações detalhadas de papeis com filtragem pelo seu identificador
 * @route GET /api/papeis/{uuid}
 * @group Papeis
 * @returns {Papeis.model} 200 - Retorna o papeis pesquisado com detalhamento de todas as suas informações.
 * @returns {Error} 401 - Falha de autenticação.
 * @returns {Error} 404 - Quando o papeis não for encontrado.
 * @returns {Error} 500 - Quando há algum erro durante o processamento da transação.
 * @param {string} uuid.path.required - uuid do papeis - eg: 710b962e-041c-11e1-9234-0123456789ab
 * @produces application/json
 */
/**
 * Exclusão de Papeiss
 * @route DELETE /api/papeis/{uuid}
 * @group Papeis - Reúne todas as interações relacionadas aos papeiss MercadoBot
 * @returns {Object} 204 - Retorna a confirmação da exclusão.
 * @returns {Error} 404 - Quando o papeis não for encontrado.
 * @returns {Error} 500 - Quando há algum erro durante o processamento da transação.
 * @param {string} uuid.path.required - uuid do papeis - eg: 710b962e-041c-11e1-9234-0123456789ab
 * @produces application/json
 * @consumes application/json
 */