
const userModel = require('../models/userModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nurseModel = require('../models/nurseModel');
const appointmnetModel = require('../models/appointmnetModel');
const moment = require('moment');


const registerController = async (req,res)=>{
    try{
        const existingUser = await userModel.findOne({email:req.body.email})
        if(existingUser){
            return res.satus(200).send({message:'User already exists',success:false})} 
        const password = req.body.password
        const salt = await bcrypt.genSalt (10)
        const hashedPassword = await bcrypt.hash(password,salt)
        req.body.password = hashedPassword
        const newUser = new userModel(req.body)
        await newUser.save()
        res.status(201).send({message:'Registered Successfully',success:true})
        }
    catch(error){
        console.log(error)
        res.satus(500).send({success:false,message:'Register Controller returned and error'})
    }
};

const loginController = async(req,res)=>{
    try {
        const user = await userModel.findOne({email:req.body.email})
        if(!user){
            return res.status(404).send({message:'User not found',success:false})
        }
        const isMatch = await bcrypt.compare(req.body.password,user.password)
        if(!isMatch){
            return res.status(400).send({message:'Invalid password',success:false})
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'})
        res.status(200).send({message:'Logged In Successfully',success:true,token});
        
    } catch (error) {
        console.log(error)
        res.status(500).send({message:`Error during the login`})
    }
};

const authController = async(req,res) =>{
    try {
        const user = await userModel.findById({_id:req.body.userId})
        user.password = undefined;
        if(!user){
            return res.status(200).send({
                message:'User not found',
                success:false
            })
        }else{
            res.status(200).send({
                success:true,
                data:user
            });
            }
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:'authorization error',
            success:false,
            error
        })
    }
};

const applyNurseController= async(req,res)=>{
    try {
        const newNurse=await nurseModel({...req.body,status:"pending"})
        await newNurse.save()
        const adminUser = await userModel.findOne({isAdmin:true})
        const notification = adminUser.notification
        notification.push({
            type:'apply-nurse-request',
            message: `${newNurse.firstName} ${newNurse.lastName} applied for nurse account`,
            data:{
                NurseId:newNurse._id,
                Name:newNurse.firstName+" "+newNurse.lastName,
                onclickPath:'/admin/nurses'
            }
        })
        await userModel.findByIdAndUpdate(adminUser._id, { notification });
        res.status(201).send({
          success: true,
          message: "Nurse account applied successfully",
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error during the apply',
        })
        
    }
};
const getAllNotificationController = async (req, res) => {
    try {
        const user = await userModel.findOne({_id:req.body.userId})
        const seennotification = user.seennotification;
        const notification = user.notification;
        seennotification.push(...notification)
        user.notification = []
        user.seennotification = notification
        const updateduser = await user.save()
        res.status(200).send({
            success: true,
            message:'All notifications marked as read',
            data:updateduser,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:'Error in notification',
            success:false,
            error
        })
    }
};

const deleteAllNotificationController = async(req,res)=>{
    try {
        const user = await userModel.findOne({_id:req.body.userId})
        user.notification = []
        user.seennotification=[]
        const updateduser = await user.save()
        updateduser.password = undefined
        res.status(200).send({
            success: true,
            message:"Notifications deleted successfully",
            data:updateduser,

        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Unable to delete all notifications',
            error
        })
    }
}
//hayda  el controller yale bade jib men 5ilelo el nurses
//hala2 bel  find bjib kel el nurses, eza approved ba3mell display
const getAllNursesController = async(req,res)=>{
    try {
        const nurses = await nurseModel.find({status:'approved'})
        res.status(200).send({
            success: true,
            message:"Getting the nurses successfully",
            data:nurses,
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while geting nurses',
            error
        })
    }
}
//hala2 badna na3mil el appointment controller ba3mel save w bade eb3atllo notfication
const bookAppointmnetController = async(req,res)=>{
    try {
        req.body.date = moment(req.body.date,'DD-MM-YYYY').toISOString();
        req.body.time = moment(req.body.time,'HH;mm').toISOString();
        req.body.status = "pending"
        const newAppointment = new appointmnetModel(req.body)
        await newAppointment.save()
        const user = await userModel.findOne({_id: req.body.nurseInfo.userId})
        user.notification.push({
            type:'New-appointment-request',
            message:`${req.body.userInfo.name} has requested an appointment with you`,
            onclickPath:'/user/appointments'
        })
        await user.save()
        res.status(200).send({
            success:true,
            message:'Appointment booked successfully',
            data:newAppointment
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while booking your appointment',
            error
        })
    }
}

const bookingAvailabilityController = async(req,res)=>{
    try {
        const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
        const fromTime = moment(req.body.time, "HH:mm")
          .subtract(1, "hour")
          .toISOString();
        const toTime = moment(req.body.time, "HH:mm").add(1, "hour").toISOString();
        const nurseId = req.body.nurseId;
        const appointments = await appointmnetModel.find({
            nurseId,
          date,
          time: {
            $gte: fromTime,
            $lte: toTime,
          },
        });
        if (appointments.length > 0) {
          return res.status(200).send({
            message: "Appointments not Availibale at this time",
            success: true,
          });
        }
        else {
            return res.status(200).send({
              success: true,
              message: "Appointment available",
            });
          };
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in booking',
            error
        })
    }
}
const userAppointmentsController = async(req,res)=>{
    try {
        const appointments = await appointmnetModel.find({userId:req.body.userId})
        res.status(200).send({
            success:true,
            message:'Appointments fetched successfully',
            data:appointments
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while getting the list of appointments',
            error
        })
    }
}

module.exports ={loginController,registerController,authController,applyNurseController,getAllNotificationController,deleteAllNotificationController,getAllNursesController,bookAppointmnetController,bookingAvailabilityController,userAppointmentsController};
