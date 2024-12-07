const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { getNurseInfoController,updateProfileController,getNurseByIdController,nurseAppointmentsController,updateStatusController } = require('../controllers/nurseCtrl')

const router = express.Router()

//hon bade a3mil post la nurse la7atta a3mella show bel profile page bi aleb el layout
router.post('/getNurseInfo', authMiddleware,getNurseInfoController )
//hala2 hayde el route yale la7 zida 3ashen a3mel update lal profile w kamen bade zid hayda el updateProfileController bi aleb el nurse controller
router.post('/updateProfile',authMiddleware,updateProfileController)
//hayde el route yale hala2 bade a3mela hiye 3ashen el booking apage
router.post('/getNurseById',authMiddleware,getNurseByIdController)
//hala2 kif 3melet bel appointment taba3 el patient bade a3mil lal nurse
router.get('/nurse-appointments',authMiddleware,nurseAppointmentsController)
//bi dal fi 3ande route 3ashen el update taba3 el status taba3 el appointement w hiye lezim tkun post 3ashen ana 3am 8ayyir bel status
router.post('/update-status',authMiddleware,updateStatusController)
module.exports = router