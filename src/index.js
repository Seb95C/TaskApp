const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const router = new express.Router()

// Setup Express
const app = express()
const port = process.env.PORT

// Configure Express
app.use(express.json())     // Automatically parse JSON requests
app.use(userRouter)         // Use router for user route handlers
app.use(taskRouter)         // Use router for task route handlers

// Test router
router.get('/', async(req, res) => {
    res.send('Working')
})

// Start server
app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})