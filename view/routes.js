const express = require('express');
const { getAllEmp , addEmp  , updateEmp , deleteEmp } = require('../controller/userController');

const router =  express.Router()

router.get('/getAll' , getAllEmp)
router.post('/addEmp' , addEmp)
router.put('/updateEmp/:empId' , updateEmp)
router.delete('/deleteEmp/:empId' , deleteEmp)




module.exports = {
    router
}