const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { User } = require('../../models')

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // ambil data user bersangkutan
    const user = await User.findOne({ where: { email }, raw: true })

    if (!user) {
      throw new Error('User not found')
    }

    // check password
    bcrypt.compare(password, user.password, (err, result) => {
      if (!err && result === true) {
        // generate token
        const payload = {
          role: user.role,
          id: user.id,
        }
        const options = { expiresIn: '5m' }
        const secretKey = 'bvhjgkasdfbkjhbd87698231y98jksdbc'

        const accessToken = jwt.sign(payload, secretKey, options)

        const refreshToken = jwt.sign(payload, secretKey, { expiresIn: '15m' })

        return res.status(201).json({ accessToken, refreshToken, user })
      }
      return res.status(400).json({ message: 'email atau password salah' })
    })
  } catch (error) {
    res.json({ message: 'Internal server error' })
  }
}

const refreshToken = (req, res) => {
  try {
    const { token } = req.body
    jwt.verify(token, 'bvhjgkasdfbkjhbd87698231y98jksdbc', (err, decoded) => {
      if (err) {
        throw new Error(err.message)
      }

      const payload = { id: decoded.id, role: decoded.role }
      const options = { expiresIn: '5m' }
      const secretKey = 'bvhjgkasdfbkjhbd87698231y98jksdbc'

      const accessToken = jwt.sign(payload, secretKey, options)

      const newRefreshToken = jwt.sign(payload, secretKey, { expiresIn: '15m' })

      return res.status(201).json({ accessToken, refreshToken: newRefreshToken })
    })
  } catch (error) {
    res.json({ message: 'Internal server error' })
  }
}

module.exports = {
  login,
  refreshToken,
}
