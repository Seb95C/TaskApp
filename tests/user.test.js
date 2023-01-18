const request = require('supertest')
const app = require('../src/app')
const User = require('../src/models/user')
const { userOneId, userOne, populateDatabase } = require('./fixtures/db')

beforeEach(populateDatabase)

test('Should sign up new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'Seb',
        email: 'seb@test.com',
        password: 'MyPass777!'
    }).expect(201)

    // Assert that the DB was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Assertions about the response
    expect(response.body).toMatchObject({
        user: {
            name: 'Seb',
            email: 'seb@test.com'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('MyPass777!')
})

test('Should log in existing user', async () => {
    const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)

    const user = await User.findById(userOneId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test ('Should reject existing user with wrong password', async () => {
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: 'randomPass123!'
    }).expect(400)
})

test('Should get profile', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
})

test('Should not get profile if not logged in', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
})

test('Should be able to delete account', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(userOneId)
    expect(user).toBeNull()
})

test('Should not delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/image.jpg')
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should not upload avatar that is not an image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/dummy.txt')
        .expect(400)
    const user = await User.findById(userOneId)
    expect(user.avatar).not.toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'John Doe',
            email: 'mail@mail.com'
        })
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user.name).toBe('John Doe')
    expect(user.email).toBe('mail@mail.com')
})

test('Should not update invalid update fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'Denver',
        })
        .expect(400)
})