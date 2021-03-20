var Job = require('../model/job');
var Category = require('../model/category');
var _ = require('lodash');

//router.get('/jobsbyuser/:id', getJobByUser);
exports.getJobByUser = (req, res, next) => {
    console.log("lll")
    Job.find({user_id:req.params.id})
    .then((result) => {
        res.status(200).json({
            result
        });
    })
    .catch(err => console.log("llll",err));
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
exports.getJobs = (req, res, next, id) => {
    Job.find({})
    .then((result) => {
        res.status(200).json({
            result
        });
    })
    .catch(err => console.log(err));
};

//router.delete("/removejob/:id", removeJob);
exports.removeJob = (req, res) => {
    Job.deleteOne({_id:req.params.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        console.log('Deleted Job');
        res.json(results);
    });
};

//router.post('/addjob',addJob);
exports.addJob = async (req, res) => {
    const job = await new Job(req.body);
    await job.save();
    res.status(200).json({
        message: "Job Added succesfully",
    });
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
           
            return next(error);
        }
        result.applicants.push(req.body.application);
        result.save().then(user => console.log(user)).catch((err)=>{throw err;});
        // Respond with valid data
        console.log('added application')
        res.json(result);
    });
};

//router.put('/unapplyJob', unapplyJob);
exports.unapplyJob = (req, res, next) =>{
    Job.findById(req.params.id)
    .then((job_) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        var ans = job_.applicants.filter(r=>r._id!=req.params.catid)
        job_.applicants = ans;
        job_.save().then(user => console.log("Deleted application")).catch((err)=>{throw err;});
        res.json({sucess: true});
    }, (err) => next(err))
    .catch((err) => next(err));
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

