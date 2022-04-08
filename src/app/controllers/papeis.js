const Papeis = require('../model/Papeis');
const { InvalidArgumentError, InternalServerError } = require('../utils/errors');

module.exports = {
  create: async (req, res) => {
    try {
      const { lista, data, operacao } = req.body;
      const papeis = new Papeis({ lista, data, operacao });
      await papeis.add();
      res.status(201).json({ "msg": 'Cadastro feito com sucesso!' });

    } catch (error) {
      if (error instanceof InvalidArgumentError) {
        res.status(422).json({ error: error.message });
      } else if (error instanceof InternalServerError) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  },

  update: async (req, res) => {
    try {
      const { uuid, lista, data, operacao } = req.body;
      const papeis = new Papeis({ uuid, lista, data, operacao });
      await papeis.update();
      res.status(201).json({ msg: 'Cadastro atualizado com sucesso!' });

    } catch (error) {
      if (error instanceof InvalidArgumentError) {
        res.status(422).json({ error: error.message });
      } else if (error instanceof InternalServerError) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: error.message });
      }
    }
  },

  findAll: async (req, res) => {
    try {
      const papeis = await Papeis.findAll();
      if (papeis.length === 0) {
        res.status(404).json({ msg: 'Sem papeis cadastrados.' });
      } else {
        res.json(papeis);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  findByDateOperation: async (req, res) => {
    try {
      var data = req.query.data
      var operacao = req.query.operacao

      const papeis = await Papeis.findByDateOperation(data, operacao);
      if (!papeis) {
        res.status(404).json({ msg: 'Não foi encontrado nenhum papel de ' + operacao + ' para a data ' + data });
      } else {
        res.json(papeis);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  findOne: async (req, res) => {
    try {
      const papeis = await Papeis.findByUuid(req.params.uuid);
      if (!papeis) {
        res.status(404).json({ msg: 'Papeis não encontrados' });
      } else {
        res.json(papeis);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  del: async (req, res) => {
    const papeis = await Papeis.findByUuid(req.params.uuid);
    try {
      if (!papeis) {
        res.status(404).send();
      }
      else {
        await papeis.del();
        res.status(204).send();
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
};
