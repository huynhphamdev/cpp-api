const router = require('express').Router()
const authenticate = require('../middlewares/auth').admin
const authController = require('../controllers/auth')
const lessonController = require('../controllers/lessons')
const exerciseController = require('../controllers/exercises')
const categoriesController = require('../controllers/categories')
const searchesController = require('../controllers/searches')
const filesController = require('../controllers/file')

router.post('/auths/login', authController.login)

router.post('/files', authenticate, filesController.getSignedUrl)

router.get('/lessons', authenticate, lessonController.list)
router.get('/lessons/:id', authenticate, lessonController.detail)
router.post('/lessons', authenticate, lessonController.create)
router.put('/lessons/:id', authenticate, lessonController.update)
router.delete('/lessons/:id', authenticate, lessonController.remove)

router.get('/categories', authenticate, categoriesController.list)
router.get('/categories/:id', authenticate, categoriesController.detail)
router.post('/categories', authenticate, categoriesController.create)
router.put('/categories/:id', authenticate, categoriesController.update)
router.delete('/categories/:id', authenticate, categoriesController.remove)

router.get('/exercises', authenticate, exerciseController.list)
router.get('/exercises/:id', authenticate, exerciseController.detail)
router.post('/exercises', authenticate, exerciseController.create)
router.put('/exercises/:id', authenticate, exerciseController.update)
router.delete('/exercises/:id', authenticate, exerciseController.remove)

router.get('/searches', authenticate, searchesController.list)
router.get('/searches/:id', authenticate, searchesController.detail)
router.post('/searches', authenticate, searchesController.create)
router.put('/searches/:id', authenticate, searchesController.update)
router.delete('/searches/:id', authenticate, searchesController.remove)

module.exports = router
