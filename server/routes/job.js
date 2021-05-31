var express = require('express');
var {getJobById, getJobByUser, completeJob, getJobByCity,getJobByWorkerActive,getJobByWorkerCompleted, getJobByDate,addWorker, getJobByPay, getJobByUserApplicants, getJobByTime, getJobByCategory, getJobs, addJob, editJob, removeJob,removeJobUser,addRating, applyJob, unapplyJob, getJobByUserActive, getJobByUserCompleted,  } = require('./../controllers/jobcontroller')
var router = express.Router();

router.get('/jobs', getJobs);
router.get('/jobsbyuser/:id', getJobByUser);
router.get('/jobsbyuseractive/:id', getJobByUserActive);
router.get('/jobsbyusercompleted/:id', getJobByUserCompleted);
router.get('/jobsbyworkeractive/:id', getJobByWorkerActive);
router.get('/jobsbyworkercompleted/:id', getJobByWorkerCompleted);
router.get('/jobsbycity/:city', getJobByCity);
router.get('/jobsbydate', getJobByDate);
router.get('/jobsbypay/:pay', getJobByPay);
router.get('/jobsbyid/:id', getJobById);
router.get('/jobsbytime/:time', getJobByTime);
router.get('/jobsbycategory/:name', getJobByCategory);
router.post('/addjob',addJob);
router.get('/jobsbyuserapplicants/:id/:jobid', getJobByUserApplicants);
router.delete("/removejob/:id", removeJob);
router.delete("/removejobuser/:id", removeJobUser);
router.put("/editJob", editJob);
router.put("/completeJob", completeJob);
router.put("/applyJob", applyJob);
router.put('/unapplyJob', unapplyJob);
router.put("/addrating", addRating);
router.put("/addworker", addWorker);
module.exports = router;
