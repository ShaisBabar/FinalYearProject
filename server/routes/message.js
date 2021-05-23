var express = require('express');
var {getmessagesbyuser, getmessagesbyworker, getconversations, sendmessage, getalluserconversations, getallworkerconversations, getcovnersationsbyworker, getcovnersationsbyuser} = require('./../controllers/messagecontroller')
var router = express.Router();

router.get('/getmessagesbyuser/:id', getmessagesbyuser);
router.get('/getmessagesbyworker/:id', getmessagesbyworker);
router.post('/sendmessage', sendmessage);
router.get('/getalluserconversations/:id', getalluserconversations);
router.get('/getallworkerconversations/:id', getallworkerconversations);
router.post('/getcovnersationsbyworker', getcovnersationsbyworker);
router.post('/getcovnersationsbyuser', getcovnersationsbyuser);
router.get('/getconversations/:userid/:workerid', getconversations);
module.exports = router;
