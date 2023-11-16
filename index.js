const express = require('express')

const app = express()
const port = 3000

// untuk menangani request json
app.use(express.json())

// import router
const userRouter = require('./src/routes/user.routes')
const nationRouter = require('./src/routes/nation.routes')
const authRouter = require('./src/routes/auth.routes')

app.use('/api', userRouter)
app.use('/api', nationRouter)
app.use('/api', authRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
