const mongoose = require("mongoose");

function connectDB(){

    // mongoose.connect('mongodb://mongodb_db:27017/mydatabase' , {useUnifiedTopology: true , useNewUrlParser: true})
    mongoose.connect(process.env.MONGO_URL, {useUnifiedTopology: true , useNewUrlParser: true})

    const connection = mongoose.connection

    connection.on('connected' , ()=>{
        console.log('Mongo DB Connection Successfull')
    })

    connection.on('error' , ()=>{
        console.log('Mongo DB Connection Error')
    })
}

connectDB()

module.exports = mongoose