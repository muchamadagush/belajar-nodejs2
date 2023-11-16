const express = require('express')
const Authentication = require('../middlewares/Authentication')

const router = express.Router()

const UserController = require('../controllers/user.controller')

/**
 * @swagger
 * /api/users:
 *      get:
 *          description: Get All User
 *          responses:
 *              200:
 *                  description: Sukses mendapatkan data
 *              500:
 *                  description: Internal server error
 */
router.get('/users', Authentication.Authentication, UserController.getAllUser)
router.post('/users', UserController.createUser)

/**
 * @swagger
 * /api/users/{id}:
 *      put:
 *          description: Update User
 *          parameters:
 *              - in: path
 *                name: id 
 *                description: ID User
 *                required: true 
 *                schema: 
 *                  type: string
 *          requestBody:
 *              content:
 *                application/json:
 *                  schema: 
 *                      type: object
 *                      properties:
 *                          fullName:
 *                              type: string
 *                              description: Nama Lengkap
 *                          email:
 *                              type: string
 *                              description: Email
 *          responses:
 *              200:
 *                  description: Sukses ubah data
 *              500:
 *                  description: Internal server error
 */
router.put('/users/:id', UserController.updateUser)

module.exports = router