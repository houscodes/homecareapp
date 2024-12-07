const nurseModel = require('../models/nurseModel')
const userModel = require('../models/userModels')

const getAllUsersController = async(req,res)=>{
    try {
        const users = await userModel.find({})
        res.status(200).send({
            success:true,
            message:'users data list',
            data:users

        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while fetching users',
            error
        }) 
    }
}
const getAllNursesController = async(req,res) =>{
    try {
        const nurses = await nurseModel.find({})
        res.status(200).send({
            success:true,
            message:'nurses data list',
            data:nurses
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while fetching nurses',
            error
        }) 
    }
}
const changeAccountStatusController = async(req,res)=>{
    try {
        const {nurseId,status} = req.body
        const nurse = await nurseModel.findByIdAndUpdate(nurseId,{status})
        const user = await userModel.findOne({_id:nurse.userId})
        const notification = user.notification
        notification.push({
            type:'nurse-account-request-updated',
            message:`Your nurse account request has been ${status}`,
            onClickPath:'/notification'
        })
        user.isNurse = status === 'approved' ? true : false
        await user.save()
        res.status(201).send({
            success:true,
            message:'nurse account status updated',
            data:nurse,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while changing status of the nurses',
            error
        }) 
    }
}

module.exports = {getAllNursesController,getAllUsersController,changeAccountStatusController}
//hawde el controllers la7atta na jib el nurses w jib el users la 3and el admin taba3e
//ana 3melet export la hayde el change account status la anno wa2t bade a3mil approve w ef2is 3al button bade 8ayyir el status