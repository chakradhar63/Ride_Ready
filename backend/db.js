const mongoose = require("mongoose");

function connectDB(){

    // mongoose.connect('mongodb://mongodb_db:27017/mydatabase' , {useUnifiedTopology: true , useNewUrlParser: true})
    mongoose.connect('mongodb+srv://chakrivanarasi:123@cluster0.vbhdsq1.mongodb.net/' , {useUnifiedTopology: true , useNewUrlParser: true})

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