const express = require('express')
const router = express.Router()

const UserController = require('../controllers/user.controller')

router.get('/users', UserController.getAllUser)
router.post('/users', UserController.createUser)
router.put('/users/:id', UserController.updateUser)

module.exports = router