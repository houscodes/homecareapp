const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('The data base is connected successfully') 
    }
    catch(error){
        console.log(`Mongodb Server Issue ${error}`.bgRed.white)
    }
}

module.exports = connectDB;