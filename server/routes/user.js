var express = require('express');
var {getusers, adduser, edituser, removeuser, loginuser, editpassword,logoutuser, getuserbyid, getuserbycity,showaddress,showphone } = require('./../controllers/usercontroller')
var router = express.Router();

router.get('/getusers', getusers);
router.post('/adduser', adduser);
router.put('/edituser', edituser);
router.put('/showphone/:id', showphone);
router.put('/showaddress/:id', showaddress);
router.delete('/removeuser', removeuser);
router.post('/loginuser', loginuser);
router.post('/logoutuser', logoutuser);
router.get('/getuserbycity/:city', getuserbycity);
router.get('/getuserbyid/:id', getuserbyid);
router.put('/editpassword', editpassword);

module.exports = router;
