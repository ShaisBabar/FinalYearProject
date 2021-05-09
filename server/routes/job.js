var express = require('express');
var {getJobById, getJobByUser, getJobByCity, getJobByDate, getJobByPay, getJobByTime, getJobByCategory, getJobs, addJob, editJob, removeJob,removeJobUser,addRating, applyJob, unapplyJob, getJobByUserActive, getJobByUserCompleted,  } = require('./../controllers/jobcontroller')
var router = express.Router();

router.get('/jobs', getJobs);
router.get('/jobsbyuser/:id', getJobByUser);
router.get('/jobsbyuseractive/:id', getJobByUserActive);
router.get('/jobsbyusercompleted/:id', getJobByUserCompleted);
router.get('/jobsbycity/:city', getJobByCity);
router.get('/jobsbydate', getJobByDate);
router.get('/jobsbypay/:pay', getJobByPay);
router.get('/jobsbyid/:id', getJobById);
router.get('/jobsbytime/:time', getJobByTime);
router.get('/jobsbycategory/:name', getJobByCategory);
router.post('/addjob',addJob);
router.delete("/removejob/:id", removeJob);
router.delete("/removejobuser/:id", removeJobUser);
router.put("/editJob", editJob);
router.put("/applyJob", applyJob);
router.put('/unapplyJob', unapplyJob);
router.put("/addrating", addRating);

module.exports = router;
