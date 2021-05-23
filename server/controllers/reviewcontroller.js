var Review = require('../model/review');



//router.get('/getreviews', getreviews);
exports.getreviews = (req, res, next, id) => {
    Review.find({})
    .then((result) => {
        res.status(200).json({
            result
        });
    })
    .catch(err => console.log(err));
};

//router.get('/getreviewsbyworker/:id', getreviewsbyworker);
exports.getreviewsbyworker = (req, res) => {
    console.log("hhhhh")
    Review.find({worker_id:req.params.id}).populate("user_id")
    .then((result) => {
        console.log('Got reviews!',result)
        res.status(200).json({
            result:result,success:true
        });
    })
    .catch(err => {
    console.log('Getting Reviews failed',err)
    res.status(200).json({
        success:false
    });
    });
};


//router.post('/addreview', addreview);
exports.addreview = (req, res) => {
    const review = new Review(req.body);
    review.save();
    Worker_.find({_id:req.body.worker_id})
    .then((result) => {
        result.avg_rating = (result.avg_rating + req.body.rating)/2;
        result.save();
        res.status(200).json({
            message: "Review Added succesfully",
        });
    })
    .catch(err => console.log(err));
    
};

//router.delete('/deletereview/:id', deletereview);
exports.deletereview = (req, res) => {
    Review.deleteOne({_id:req.params.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        console.log('Deleted Review');
        res.json(results);
    });
};

//router.put('/editreview', editreview);
exports.editreview = (req, res, next) =>{
    Review.findOneAndUpdate({_id:req.body.review._id},req.body.review,function(error, results) {
        if (error) {
        return next(error);
        }
        Worker_.find({_id:req.body.worker_id})
        .then((result) => {
            result.avg_rating = (result.avg_rating + req.body.rating)/2;
            result.save();
            res.status(200).json({
                message: "Review Updated succesfully",
            });
        })
        .catch(err => console.log(err));
            });
   
};
