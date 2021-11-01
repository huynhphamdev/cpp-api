const router = require('express').Router()
const lessonsController = require('../controllers/lessons')
const categoriesController = require('../controllers/categories')
const exercisesController = require('../controllers/exercises')
const searchesController = require('../controllers/searches')

router.get('/lessons', lessonsController.list)
router.get('/lessons/:id', lessonsController.detail)
router.get('/categories', categoriesController.list)
router.get('/exercises', exercisesController.list)
router.get('/exercises/:id', exercisesController.detail)
router.get('/searches', searchesController.list)
router.get('/searches/:id', searchesController.detail)

module.exports = router
