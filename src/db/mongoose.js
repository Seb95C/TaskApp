const mongoose = require('mongoose')

const dbAdress = process.env.DBADRESS

mongoose.connect(dbAdress)