//CRUD

const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-app'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to DB!')
    }

    const db = client.db(databaseName)

    db.collection('tasks').deleteOne({
        description: 'Do laundry'
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
})