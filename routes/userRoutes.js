const express = require('express')
const { loginController, registerController, authController,applyNurseController,getAllNotificationController,deleteAllNotificationController,getAllNursesController,bookAppointmnetController,bookingAvailabilityController,userAppointmentsController } = require('../controllers/userCtrl')
const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()



router.post('/login',loginController)
router.post('/register',registerController)
router.post('/getUserData',authMiddleware,authController)
router.post('/apply-nurse',authMiddleware,applyNurseController)
// notification post route 3ashen a3mel get la kel el notifications
router.post('/get-all-notifications',authMiddleware,getAllNotificationController)
router.post('/delete-all-notifications',authMiddleware,deleteAllNotificationController)
//hala2 bade  a3mel route la7atta jib kel el nurses ele availabe
router.get('/getAllNurses',authMiddleware,getAllNursesController)
//route lal booking taba3 el appointment
router.post('/book-appointment',authMiddleware,bookAppointmnetController)
//route to check el availability taba3 el appointment
router.post('/booking-availability',authMiddleware,bookingAvailabilityController)
//hala2 el appointment list bade farjihon wa2t fout 3al section appointments
router.get('/user-appointmnents',authMiddleware,userAppointmentsController)
 
module.exports = router
