const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

// Setup Express
const app = express()
const port = process.env.PORT || 3000

// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         res.send('GET requests are disabled')
//     } else {
//         next()
//     }
// })

// Maintenance mode
// app.use((req, res, next) => {
//     res.status(503).send('Site is under maintenance right now. Try again later!')
// })

// Configure Express
app.use(express.json())     // Automatically parse JSON requests
app.use(userRouter)         // Use router for user route handlers
app.use(taskRouter)         // Use router for task route handlers

// Start server
app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})