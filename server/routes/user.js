var express = require('express');
var {getusers, adduser, edituser, removeuser, loginuser, logoutuser, getuserbyid, getuserbycity } = require('./../controllers/usercontroller')
var router = express.Router();

router.get('/getusers', getusers);
router.post('/adduser', adduser);
router.put('/edituser', edituser);
router.delete('/removeuser', removeuser);
router.post('/loginuser', loginuser);
router.post('/logoutuser', logoutuser);
router.get('/getuserbycity/:city', getuserbycity);
router.get('/getuserbyid/:id', getuserbyid);

module.exports = router;
