const mongoose = require('mongoose')
 const appointmentSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    nurseId:{
        type:String,
        required:true
    },
    nurseInfo:{
        type:String,
        required:true
    },
    userInfo:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        default: 'pending'
    },
    time:{
        type:String,
        required:true
    }
 },{timestamps:true})

 const appointmnetModel = mongoose.model('appointments',appointmentSchema)

 module.exports = appointmnetModel;