const _ = require('lodash')

const {
  Lesson,
  Category,
  sequelize,
} = require('../models')
const { response } = require('../services/response')

const list = async (req, res) => {
  const {
    offset = 0,
    limit = 100,
    order = 'asc',
    order_by = 'title',
  } = req.query

  const { rows, count: total } = await Lesson.findAndCountAll({
    offset,
    limit,
    include: [{
      model: Category,
      as: 'category',
    }],
    order: [[order_by, order]],
  })

  res.json(response({
    lessons: rows.map(r => r.display()),
    total,
  }))
}

const detail = async (req, res) => {
  const { id } = req.params
  const lesson = await Lesson.findOne({
    where: { id },
    include: [{
      model: Category,
      as: 'category',
    }],
  })

  res.json(response(lesson.display()))
}

const create = async (req, res) => {
  const lesson = await Lesson.create(_.omit(req.body, 'id'))

  res.json(response(lesson.display()))
}

const update = async (req, res) => {
  const { id } = req.params

  const [, [lesson]] = await Lesson.update(_.omit(req.body, 'id'), {
    where: { id },
    returning: true,
  })

  res.json(response(lesson.display()))
}

const remove = async (req, res) => {
  const { id } = req.params

  await Lesson.destroy({
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
