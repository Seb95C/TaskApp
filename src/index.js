const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

// Setup Express
const app = express()
const port = process.env.PORT || 3000

// Configure Express
app.use(express.json())     // Automatically parse JSON requests
app.use(userRouter)         // Use router for user route handlers
app.use(taskRouter)         // Use router for task route handlers

// Start server
app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})

const jwt = require('jsonwebtoken')

const myFunc = async () => {
    const token = jwt.sign({ _id: 'idd2' }, 'mykeyishere', { expiresIn: '7 days' })
    console.log(token)

    const data = jwt.verify(token, 'mykeyishere')
    console.log(data)
}

myFunc()