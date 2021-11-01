const _ = require('lodash')
const { Op } = require('sequelize')

const {
  Exercise,
} = require('../models')
const { response } = require('../services/response')

const list = async (req, res) => {
  const {
    offset = 0,
    limit = 100,
    query,
    order = 'asc',
    order_by = 'id'
  } = req.query

  const args = {
    offset,
    limit,
    order: [[order_by, order]],
  }
  if (query) {
    args.where = { 
      name: { 
        [Op.iLike]: `%${standardizeQueryString(query)}%`,
      },
    }
  }

  const { rows, count: total } = await Exercise.findAndCountAll(args)

  res.json(response({
    exercises: rows.map(r => r.display()),
    total,
  }))
}

const detail = async (req, res) => {
  const { id } = req.params
  const exercise = await Exercise.findOne({
    where: { id },
  })

  res.json(response(exercise.display()))
}

const create = async (req, res) => {
  const exercise = await Exercise.create(_.omit(req.body, 'id'))

  res.json(response(exercise.display()))
}

const update = async (req, res) => {
  const { id } = req.params

  const [, [exercise]] = await Exercise.update(_.omit(req.body, 'id'), {
    where: { id },
    returning: true,
  })

  res.json(response(exercise.display()))
}

const remove = async (req, res) => {
  const { id } = req.params

  await Exercise.destroy({
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
