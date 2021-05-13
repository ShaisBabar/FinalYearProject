var Job = require('../model/job');
var Category = require('../model/category');
var _ = require('lodash');
var mongoose = require('mongoose')

//router.get('/jobsbyuser/:id', getJobByUser);
exports.getJobByUser = (req, res, next) => {
    Job.find({user_id:req.params.id}).populate('categories').populate('applicants.worker_id')
    .then((result) => {
        res.status(200).json({
            result:result,success:true
        });
    })
    .catch(err => {console.log("Error:",err)
    res.status(200).json({
        error:err,success:false
    })});
};

//router.get('/jobsbyuserapplicants/:id/:jobid', getJobByUserApplicants);
exports.getJobByUserApplicants = (req, res) => {
    Job.findOne({user_id:req.params.id,_id:req.params.jobid}).populate('categories').populate('applicants.worker_id')
    .then((result) => {
        res.status(200).json({
            result:result,success:true
        });
    })
    .catch(err => {console.log("Error:",err)
    res.status(200).json({
        error:err,success:false
    })});
};

exports.getJobByUserActive = (req, res) => {
    console.log('hereee')
    Job.find({user_id:req.params.id,is_completed:false}).populate('categories').populate('applicants.worker_id')
    .then((result) => {
        console.log(result)
        result.forEach(element => {
            console.log(element.applicants)
        });
        res.status(200).json({
            result:result,success:true
        });
    })
    .catch(err => {console.log("Error:",err)
    res.status(200).json({
        error:err,success:false
    });
});
};

exports.getJobByUserCompleted = (req, res, next) => {
    Job.find({user_id:req.params.id,is_completed:true})
    .then((result) => {
        res.status(200).json({
            result:result,success:true
        });
    })
    .catch(err => {
    console.log("Error:",err)
    res.status(200).json({
        error:err,success:false
    });
    });
};

//router.get('/jobsbyid/:id', getJobById);
exports.getJobById = (req, res, next, id) => {
    Job.findById(id)
    .then((result) => {
        res.status(200).json({
            result
        });
    })
    .catch(err => console.log(err));
};

//router.get('/jobsbycity/:city', getJobByCity);
exports.getJobByCity = (req, res, next) => {
    Job.find({city:req.params.city})
    .then((result) => {
        res.status(200).json({
            result
        });
    })
    .catch(err => console.log(err));
};


//router.get('/jobsbydate', getJobByDate);
exports.getJobByDate = (req, res, next) => {

    Job.find({city:req.params.city})
    .then((result) => {
        res.status(200).json({
            result
        });
    })
    .catch(err => console.log(err));
};
//router.get('/jobsbypay/:pay', getJobByPay);
exports.getJobByPay = (req, res, next) => {
    Job.find({pay:req.params.pay})
    .then((result) => {
        res.status(200).json({
            result
        });
    })
    .catch(err => console.log(err));
};

//router.get('/jobsbytime/:time', getJobByTime);
exports.getJobByTime = (req, res, next) => {
    Job.find({expected_time:req.params.time})
    .then((result) => {
        res.status(200).json({
            result
        });
    })
    .catch(err => console.log(err));
};

//router.get('/jobsbycategory/:name', getJobByCategory);
exports.getJobByCategory = (req, res, next) => {
    Catgory.find({name: req.params.name})
    .then((id) => {
        Job.find({categories: id})
    .then((result) => {
        res.status(200).json({
            result
        });
    })
    .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
    
};

//router.get('/jobs', getJobs);
exports.getJobs = (req, res) => {
    Job.find({}).populate('categories').populate('applicants.worker_id').populate('user_id')
    .then((result) => {
        res.status(200).json({
            result:result,success:true
        });
    })
    .catch(err => {
        console.log("Error:",err)
        res.status(200).json({
            error:err,success:false
        });
        });
};

//router.delete("/removejob/:id", removeJob);
exports.removeJob = (req, res) => {
    Job.deleteOne({_id:req.params.id }, function(error, results) {
        if (error) {
            return res.json({success:false});;
        }
        console.log('Deleted Job');
        res.json({success:true});
    });
};

//router.delete("/removejobuser/:id", removeJob);
exports.removeJobUser = (req, res) => {
    Job.deleteMany({user_id:req.params.id,is_completed:true }, function(error, results) {
        if (error) {
            return res.json({success:false});;
        }
        console.log('Deleted All User Completed Jobs');
        res.json({success:true});
    });
};

//router.post('/addjob',addJob);
exports.addJob = async (req, res) => {
    Category.findOne({name:req.body.categories[0]}).then((result)=>{
        req.body.categories = [result._id]
        if(req.body.description.length==0 || req.body.description==null || req.body.description==undefined){
            req.body.description="None"
        }
        const job = new Job(req.body);
        job.save().then(()=>
        {
        console.log("Post Added succesfully")
        res.status(200).json({
            message: "Post Added succesfully",success:true
        })
        }).catch(err=>{
            console.log('Error: ',err)
            res.status(400).json({
            message: "Post Adding failed",success:false
        })});
    })
    
    
};

//router.put("/editJob", editJob);
exports.editJob = (req, res, next) =>{
    Job.findOneAndUpdate({_id:req.body.job._id},req.body.job,function(error, results) {
        if (error) {
        return next(error);
        }
        console.log('Updated Job Details');
        res.json(results);
        });
   
};

//router.put("/applyJob", applyJob);
exports.applyJob = (req, res, next) =>{
    Job.findById(req.body.id).exec(function(error, result) {
        if (error) {
            res.status(400).json({success:false});
        }
        result.applicants.push(req.body.application);
        result.save().then(user => console.log(user)).catch((err)=>{throw err;});
        // Respond with valid data
        console.log('added application')
        res.status(200).json({success:true});
    });
};

//router.put('/unapplyJob', unapplyJob);
exports.unapplyJob = (req, res) =>{
    console.log("kk",req.body)
    Job.findById(req.body.id)
    .then((job_) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        var ans = job_.applicants.filter(r=>r.worker_id!=req.body.workerid)
        job_.applicants = ans;
        job_.save().then(user => console.log("Deleted application")).catch((err)=>{throw err;});
        res.json({success: true});
    })
    .catch((err) => res.json({success: false}));
 };

//router.put("/addrating", addRating);
exports.addRating = (req, res, next) =>{
    Job.findOneAndUpdate({_id:req.body.job._id},{rating:req.body.rating,remarks:req.body.remarks,is_completed:true},function(error, results) {
        if (error) {
        return next(error);
        }
        console.log('Updated Job Details');
        res.json(results);
        });
   
};

//router.put("/addworker", addWorker);
exports.addWorker = (req, res) =>{
    console.log('llll')
    req.body.workerid = mongoose.Types.ObjectId(req.body.workerid)
    Job.findOneAndUpdate({_id:req.body.id},{assigned_to:req.body.workerid},function(error, results) {
        if (error) {
            console.log(error)
            res.status(400).json({success: false})
        }
        console.log('Job Assigned');
        res.status(200).json({results:results,success:true});
        });
   
};

