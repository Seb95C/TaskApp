const request = require('supertest')
const app = require('../src/app')
const Task = require ('../src/models/task')
const { userOne,
    userTwo,
    taskTwo,
    populateDatabase
} = require('./fixtures/db')

beforeEach(populateDatabase)

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'Test task'
        })
        .expect(201)
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toBe(false)
})

test('Should get tasks for a single user', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .expect(200)
    expect(response.body.length).toBe(2)
})

test('Should not allow delete task by unauthorised user', async () => {
    await request(app)
        .delete(`/tasks/${taskTwo._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .expect(404)
    const task = await Task.findById(taskTwo._id)
    expect(task).not.toBeNull()
})