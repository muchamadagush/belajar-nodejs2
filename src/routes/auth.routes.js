const express = require('express')

const router = express.Router()

const authController = require('../controllers/auth.controller')

router.post('/auth/login', authController.login)
router.post('/auth/refresh-token', authController.refreshToken)

module.exports = router
