const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'George',
    email: 'george@test.com',
    password: 'testPass12345!@and',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.SECRETKEY)
    }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: 'Mike',
    email: 'mike@test.com',
    password: 'thePaSS345!@and',
    tokens: [{
        token: jwt.sign({ _id: userTwoId }, process.env.SECRETKEY)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: "Test task number 1",
    completed: false,
    userId: userOneId
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: "Test task number 2",
    completed: true,
    userId: userOneId
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: "Test task number 3",
    completed: true,
    userId: userTwoId
}

const populateDatabase = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userOne).save()
    await new User(userTwo).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    taskOne,
    taskTwo,
    taskThree,
    populateDatabase
}