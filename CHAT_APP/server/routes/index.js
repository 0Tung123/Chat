const express = require('express')
const registerUser = require('../controller/registerUser')
const checkEmail = require('../controller/checkEmail')
const checkPassword = require('../controller/checkPassword')
const userDetails = require('../controller/userDetail')
const logout = require('../controller/logout')
const updateUserDetails = require('../controller/updateUserDetails')
const searchUser = require('../controller/searchUser')


const router = express.Router()

//create user api
router.post('/register', registerUser)



//check user email
router.post('/email', checkEmail)

//check user Password
router.post('/password', checkPassword)

//login user detail
router.get('/user-details', userDetails)

//logut
router.get('/logout', logout)

//update user details
router.post('/update-user', updateUserDetails)

//Search User
router.post("/search-user", searchUser)
module.exports = router