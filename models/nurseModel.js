const mongoose = require('mongoose')
const nurseSchema = new mongoose.Schema({
    userId:{
        type:String,
    },
    firstName: {
        type:String,
        required:[true,'First name is required']
    },
    lastName: {
        type:String,
        required:[true,'Last name is required']
    },
    phone:{
        type:String,
        required:[true,'Phone number is required']
    },
    email:{
        type:String,
        required:[true,'Email is required']
    },
    website:{
        type:String,
    },
    address:{
        type:String,
        reuired:[true,'Address is required']
    },
    specialization:{
        type:String,
        required:[true,'Specialization is required']
    },
    experience:{
        type:String,
        required:[true,'Experience is required']
    },
    feesPerConsultation:{
        type:Number,
        required:[true,'Fees are required']
    },
    status:{
        type:String,
        default:"pending"  
    },
    timings:{
        type:Object,
        required:[true,'Work availability is required']
    },

},{ timestamps:true})
const nurseModel = mongoose.model('nurses',nurseSchema)
module.exports = nurseModel