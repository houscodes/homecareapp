const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { connect } = require('mongoose');
const connectDB = require('./config/db');

dotenv.config()
connectDB();
const app = express();

app.use(express.json()); 
app.use(morgan('dev'));

app.use('/api/v1/user', require('./routes/userRoutes'))
app.use('/api/v1/admin',require('./routes/adminRoutes'))
app.use('/api/v1/nurse',require('./routes/nurseRoutes'))

const port = process.env.PORT || 8080;

app.listen(port,()=>{
    console.log(`server is running on port ${port}`.bgBlue.black);
})