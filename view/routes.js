const express = require('express');
const { getAllEmp , addEmp  , updateEmp , deleteEmp, registerController, loginController, refreshController, logoutController, profileController } = require('../controller/userController');

const router =  express.Router()

router.get('/getAll' , getAllEmp)
router.post('/addEmp' , addEmp)
router.put('/updateEmp/:empId' , updateEmp)
router.delete('/deleteEmp/:empId' , deleteEmp)

// for register

router.post('/register' , registerController)

// login
router.post('/login' , loginController)

// refresh token
router.post("/refreshToken", refreshController) 

// log-out
router.post("/logout" , logoutController)

// profile
router.post('/profile' , profileController)




module.exports = {
    router
}