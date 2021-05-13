var Worker_ = require("../model/worker");
const Bcrypt = require("bcryptjs");
const mongoose = require('mongoose');


//router.get('/getworkers', getworkers);
exports.getworkers = (req, res) => {
    console.log("hhhh")
    Worker_.find({})
    .then((result) => {
        res.status(200).json({
            result
        });
    })
    .catch(err => console.log(err));
};

//router.post('/addworker', addworker);
exports.addworker= (req, res) => {
    console.log("here",req.body)
    Worker_.findOne({
        email:req.body.email
    }).then(user=> {
          if(user){
            res.status(200).json({
                message: "Worker already exists",
                success:false
            });
          }
          else{
            req.body.password = Bcrypt.hashSync(req.body.password, 10);
            req.body.categories.forEach(element => {
                element = [mongoose.Types.ObjectId(element)];
            });
            const user = new Worker_(req.body);
            user.save();
            res.status(200).json({
                message: "Worker Added succesfully",
                success:true
            });
              
          }
            }).catch(err => {
                console.log(err)
                res.status(401).json({
                message: "Worker Registration Failed",
                success:false
            })});
   
};

//router.put('/editworker', editworker);
exports.editworker = (req, res, next) =>{
    Worker_.findOneAndUpdate({_id:req.body.worker._id},req.body.worker,function(error, results) {
        if (error) {
        return next(error);
        }
        console.log('Updated Worker Details');
        res.json(results);
        });
   
};

//router.delete('/removeworker', removeworker);
exports.removeworker = (req, res) => {
    Worker_.deleteOne({_id:req.params.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        console.log('Deleted Worker');
        res.json(results);
    });
};

//router.post('/loginworker', loginworker);
exports.loginworker = (request, response) => {
   Worker_.findOne({
      email:request.body.email
  }).then(user=> {
        if(user)
        {
            Bcrypt.compare(request.body.password, user.password, function(err, res) {
                if(res) {
                 // Passwords match
                    user.isLoggedin = true;
                    user.save().then(user => console.log("")).catch((err)=>{throw err;});
                    response.send({user: user,success:true})
                } else {
                 // Passwords don't match
                console.log('Worker does not exist') 
                response.json({error: 'Worker does not exist',success:false})
                } 
              });
          }
          else 
          {
              console.log('Worker does not exist')
              response.json({error: 'Worker does not exist',success:false})
          }

      })
    .catch(err=>
      {
          response.send('error: '+err)

      })
};

//router.post('/logoutworker', logoutworker);
exports.logoutworker = (request, response) => {
   Worker_.findOne({
      email:request.body.email
  }).then(user=> {
        if(user)
        {
            Bcrypt.compare(request.body.password, user.password, function(err, res) {
                if(res) {
                 // Passwords match
                    user.isLoggedin = false;
                    user.save().then(user => console.log("")).catch((err)=>{throw err;});
                    response.send({success:true})
                } else {
                 // Passwords don't match
                console.log('Worker does not exist') 
                response.json({error: 'Worker does not exist',success:false})
                } 
              });
          }
          else 
          {
              console.log('Worker does not exist')
              response.json({error: 'Worker does not exist',success:false})
          }

      })
    .catch(err=>
      {
          response.send('error: '+err)

      })
};

//router.get('/getworkerbycity', getworkerbycity);
exports.getworkerbycity = (req, res, next, id) => {
    Worker_.find({city:req.params.city})
    .then((result) => {
        res.status(200).json({
            result
        });
    })
    .catch(err => console.log(err));
};

//router.get('/getworkerbycat', getworkerbycat);
exports.getworkerbycat = (req, res, next, id) => {
    Catgory.find({name: req.params.name})
    .then((id) => {
        Worker_.find({categories: id})
    .then((result) => {
        res.status(200).json({
            result
        });
    })
    .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

//router.get('/getworkerbyratings', getworkerbyratings);
exports.getworkerbyratings = (req, res, next, id) => {
    Worker_.find({})
    .then((result) => {
        var work = [];
        result.forEach(element => {
            if(element.rating>=req.params.rating){
                work.push(element)
            }
        });
        res.status(200).json({
            work
        });
    })
    .catch(err => console.log(err));
};

//router.get('/getworkerbyname', getworkerbyname);
exports.getworkerbyname = (req, res, next, id) => {
    Worker_.find({ "name": { "$regex": req.params.name, "$options": "i" } })
    .then((result) => {
        res.status(200).json({
            result
        });
    })
    .catch(err => console.log(err));
};


