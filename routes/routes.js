const express = require('express');
const {getUsers,createUser,getUser,deleteUser,updateUser} = require('../controllers/controllers')


const router = express.Router();


router.get('/',getUsers)

// const xyz = (req,res,next) => {
//     console.log("hello M")
//     next()
// }

router.post('/',createUser)

router.get('/:id',getUser)

router.delete('/:id',deleteUser)

router.patch('/:id',updateUser)

module.exports = router;

