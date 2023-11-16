const bcrypt = require('bcrypt')
const { User, Nation } = require('../../models')
const BuildResponse = require('../modules/BuildResponse')

const getAllUser = async (req, res) => {
  try {
    // eslint-disable-next-line prefer-const
    let { page, pageSize, fullName } = req.query
    page = parseInt(page) || 1
    pageSize = parseInt(pageSize) || 10

    let where = {}
    if (fullName) {
      where = { fullName }
    }

    const user = await User.findAll({
      include: [
        {
          model: Nation,
        },
      ],
      limit: pageSize,
      offset: (page - 1) * pageSize,
      where,
    })

    const total = await User.count()

    // ada perubahan
    const buildResponse = BuildResponse.get({ data: user, total })

    res.status(200).json(buildResponse)
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

const createUser = async (req, res) => {
  try {
    const { body } = req
    const { fullName, email, password } = body

    const saltRounds = 10
    const hashPassword = bcrypt.hashSync(password, saltRounds)

    await User.create({
      fullName, email, password: hashPassword, status: 'Active',
    })

    // perubahan juga
    // ada perubahan lagi
    const buildResponse = BuildResponse.created({})

    res.status(201).json(buildResponse)
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

const updateUser = async (req, res) => {
  try {
    const { id } = req.params
    const { body } = req
    const {
      fullName, email, status, NationId,
    } = body
    const user = await User.findByPk(id)

    if (!user) {
      throw new Error('User not found')
    }

    await User.update({
      fullName, email, status, NationId,
    }, { where: { id } })

    const buildResponse = BuildResponse.updated({})

    res.status(200).json(buildResponse)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

module.exports = {
  getAllUser,
  createUser,
  updateUser,
}
