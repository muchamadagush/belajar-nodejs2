/* eslint-disable radix */
const bcrypt = require('bcrypt')
const { User, Nation } = require('../../models')

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
    // perubahan baru git
    // perubahan baru di master
    // perubahan dari branch feature post

    res.status(200).json({ data: user, total })
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

    res.status(201).json({})
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

    res.status(200).json({})
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
