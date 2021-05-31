var express = require('express');
var {getworkers, addworker, editworker,getworkerbyid, removeworker, loginworker, logoutworker, getworkerbycity, getworkerbycat, getworkerbyratings, getworkerbyname,  } = require('./../controllers/workercontroller')
var router = express.Router();

router.get('/getworkers', getworkers);
router.post('/addworker', addworker);
router.put('/editworker', editworker);
router.delete('/removeworker', removeworker);
router.post('/loginworker', loginworker);
router.post('/logoutworker', logoutworker);
router.get('/getworkerbycity', getworkerbycity);
router.get('/getworkerbycat', getworkerbycat);
router.get('/getworkerbyratings', getworkerbyratings);
router.get('/getworkerbyname', getworkerbyname);
router.get('/getworkerbyid/:id', getworkerbyid);

module.exports = router;
