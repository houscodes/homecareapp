const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/authMiddleware')
const { getAllUsersController,getAllNursesController,changeAccountStatusController } = require('../controllers/adminCtrl')


router.get('/getAllUsers', authMiddleware,getAllUsersController )
router.get('/getAllNurses', authMiddleware,getAllNursesController )
//hala2 bade wa2t a3mil approve lal nurse request 8ayyir el status taba3a
router.post('/changeAccountStatus',authMiddleware,changeAccountStatusController)

module.exports = router