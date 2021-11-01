const _ = require('lodash')
const { Op } = require('sequelize')

const {
  Search,
  sequelize,
} = require('../models')
const { response } = require('../services/response')

const list = async (req, res) => {
  const {
    offset = 0,
    limit = 100,
    query,
    order = 'asc',
    order_by = 'name',
  } = req.query

  const args = {
    offset,
    limit,
    order: [[order_by, order]],
  }

  if (query) {
    args.where = {
      name: { [Op.iLike]: `%${standardizeQueryString(query)}%`},
    }
  }

  const { rows, count: total } = await Search.findAndCountAll(args)

  res.json(response({
    searches: rows.map(r => r.display()),
    total,
  }))
}

const detail = async (req, res) => {
  const { id } = req.params
  const search = await Search.findOne({
    where: { id },
  })

  res.json(response(search.display()))
}

const create = async (req, res) => {
  const search = await Search.create(_.omit(req.body, 'id'))

  res.json(response(search.display()))
}

const update = async (req, res) => {
  const { id } = req.params

  const [, [search]] = await Search.update(_.omit(req.body, 'id'), {
    where: { id },
    returning: true,
  })

  res.json(response(search.display()))
}

const remove = async (req, res) => {
  const { id } = req.params

  await Search.destroy({
    where: { id },
  })

  res.json(response(null))
}

module.exports = {
  list,
  detail,
  create,
  update,
  remove,
}
