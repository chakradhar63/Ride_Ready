const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser')
const corsOptions = {
    origin:'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
require("dotenv").config();
const port = process.env.PORT || 5000
const dbConnection = require('./db.js')

app.use(cors({
    origin: '*',
    methods: '*',   
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin: *');
    res.header('Access-Control-Allow-Methods: *');
    res.header('Access-Control-Allow-Headers: *');
    next();
});

app.use('/api/cars/' , require('./routes/carsRoute.js'))
app.use('/api/users/' , require('./routes/usersRoute.js'))
app.use('/api/bookings/' , require('./routes/bookingsRoute.js'))

const path = require('path')

if(process.env.NODE_ENV==='production')
{
    app.use('/' , express.static('client/build'))
    app.get('*' , (req , res)=>{
          res.sendFile(path.resolve(__dirname, 'client/build/index.html'));
    })
}

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Node JS Server Started in Port ${port}`))

module.exports = app;