const _ = require('lodash')

const {
  Lesson,
  Category,
} = require('../models')
const { response } = require('../services/response')

const list = async (req, res) => {
  const {
    offset = 0,
    limit = 100,
    order = 'asc',
    order_by = 'name'
  } = req.query

  const { rows, count: total } = await Category.findAndCountAll({
    offset,
    limit,
    include: [{
      model: Lesson,
      as: 'lessons',
      separate: true,
      order: [['title', 'asc']],
    }],
    order: [[order_by, order]],
  })

  res.json(response({
    categories: rows.map(r => r.display()),
    total,
  }))
}

const detail = async (req, res) => {
  const { id } = req.params
  const category = await Category.findOne({
    where: { id },
  })

  res.json(response(category.display()))
}

const create = async (req, res) => {
  const category = await Category.create(_.omit(req.body, 'id'))

  res.json(response(category.display()))
}

const update = async (req, res) => {
  const { id } = req.params

  const [, [category]] = await Category.update(_.omit(req.body, 'id'), {
    where: { id },
    returning: true,
  })

  res.json(response(category.display()))
}

const remove = async (req, res) => {
  const { id } = req.params

  await Category.destroy({
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
