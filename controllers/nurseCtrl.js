const appointmnetModel = require("../models/appointmnetModel");
const nurseModel = require("../models/nurseModel");
const userModel = require("../models/userModels");

const getNurseInfoController = async (req, res) => {
  try {
    const nurse = await nurseModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "Nurse data is fetched successfully",
      data: nurse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while fetching the nurse's details",
      error,
    });
  }
};

const updateProfileController = async(req,res)=>{
  try {
    const nurse = await nurseModel.findOneAndUpdate({ userId: req.body.userId }, req.body);
    res.status(201).send({
      success: true,
      message: "Nurse profile is updated successfully",
      data:nurse,
    })
    
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:'Unable to update nurse profile',
      error

    })
  }
};
const getNurseByIdController = async(req,res)=>{
  try {
    const nurse = await nurseModel.findOne({_id:req.body.nurseId})
    res.status(200).send({
      success:true,
      message:'Nurse information is fetched successfully',
      data:nurse
    })
    
  } catch (error) {
    console.log(error)
    console.log(error)
    res.status(500).send({
      success:false,
      message:'Unable to get the nurse information requested',
      error
    })
  }

}
const nurseAppointmentsController = async(req,res)=>{
  try {
    const nurse = await nurseModel.findOne({userId:req.body.userId})
    const appointments = await appointmnetModel.find({nurseId:nurse._id})
    res.status(200).send({
      success:true,
      message:'Nurse appointments are fetched successfully',
      data:appointments,
    })
    
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:'Unable to get the nurse appointments',
      error
    }) 
  }
}
const updateStatusController = async(req,res)=>{
  try {
    const {appointmentId,status} = req.body
    const appointment = await appointmnetModel.findByIdAndUpdate(appointmentId,{status})
    const user = await userModel.findOne({_id: appointment.userId})
    const notification = user.notification;
    notification.push({
        type:'status updated',
        message:`Your appointment has been updated ${status}`,
        onclickPath:'/nurse-appointments'
    })
    await user.save()
    res.status(200).send({
      success:true,
      message:'Appointment status is updated successfully',
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success:false,
      message:'Unable to update the status',
      error
    })
  }
}

module.exports = { getNurseInfoController,updateProfileController,getNurseByIdController,nurseAppointmentsController,updateStatusController };
// hayda el controller hadafo eno ana a3mel display la nurse details
//hala2 bzid el route bel server.js
//bade jib el appointments taba3 el doctor bi tari2et el find 
//hala2 bade jib el notification men 3and el user
