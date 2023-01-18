const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const router = new express.Router()

// Setup Express
const app = express()

// Test router
router.get('/', async(req, res) => {
    res.send('Working')
})

// Configure Express
app.use(express.json())     // Automatically parse JSON requests
app.use(userRouter)         // Use router for user route handlers
app.use(taskRouter)         // Use router for task route handlers
app.use(router)             // Use test router

module.exports = app