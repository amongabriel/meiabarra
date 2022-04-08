const papeisDao = require('../dao/papeis');
const { InvalidArgumentError } = require('../utils/errors');
const validator = require('../utils/validator');
const uuid = require('uuid');

class Papeis {
  constructor(papeis) {
    this.uuid = papeis.uuid;
    this.lista = papeis.lista;
    this.data = papeis.data;
    this.operacao = papeis.operacao;

    this.validate();
  }

  addUuid(id = false) {
    if (!id) {
      this.uuid = uuid.v4();
    } else {
      this.uuid = id;
    }
  }

  validate() {
    validator.notNull(this.lista, 'lista');
    validator.notNull(this.data, 'data');
    validator.notNull(this.operacao, 'operacao');
  }

  async add() {
    if (await Papeis.findByDateOperation(this.data, this.operacao)) {
      throw new InvalidArgumentError(`Já existe operaçao de ${this.operacao} para a data ${this.data} no sistema!`);
    }
    this.addUuid();
    await papeisDao.add(this);
  }

  async update() {
    if (!await Papeis.findByUuid(this.uuid)) {
      throw new InvalidArgumentError('uuid não encontrado!');
    }
    const papeis = await Papeis.findByDateOperation(this.data, this.operacao);
    if (papeis && papeis.uuid !== this.uuid) {
      throw new InvalidArgumentError(`Já existe operaçao de ${this.operacao} para a data ${this.data} no sistema!`);
    }
    papeisDao.update(this);
  }

  async del() {
    return papeisDao.del(this);
  }

  static async findByUuid(uuid) {
    const papeis = await papeisDao.findByUuid(uuid);
    if (!papeis) {
      return null;
    }

    return new Papeis(papeis);
  }


  static async findByDateOperation(data, operacao) {
    const papeis = await papeisDao.findByDateOperation(data, operacao);
    if (!papeis) {
      return null;
    }

    return new Papeis(papeis);
  }

  static async findAll() {
    return papeisDao.findAll();
  }
}

module.exports = Papeis;
