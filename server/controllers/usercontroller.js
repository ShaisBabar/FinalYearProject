var User = require("../model/user");
const Bcrypt = require("bcryptjs");

//router.get('/getuserbyid/:id', getuserbyid);
exports.getuserbyid = (req, res, next) => {
    User.findById(req.params.id)
    .then((result) => {
        var  t = result;
        console.log(t)
        res.status(200).json({
            result
        });
    })
    .catch(err => response.send('error: '+err));
};


//router.get('/getusers', getusers);
exports.getusers = (req, res, next) => {
    console.log("oooo")
    User.find({})
    .then((result) => {
        res.status(200).json({
            result
        });
    })
    .catch(err => console.log(err));
};

//router.post('/adduser', adduser);
exports.adduser = (req, res) => {
    User.findOne({
        email:req.body.email
    }).then(user=> {
          if(user){
            console.log("User Already exists.")
            res.status(200).json({
                message: "User already exists",
            });
          }
          else{
            req.body.password = Bcrypt.hashSync(req.body.password, 10);
            const user = new User(req.body);
            user.save();
            console.log("User Registration successful.")
            res.status(200).json({
                message: "User Added succesfully",
                token: user._id,
                user:user
            });
              
          }
        }).catch(err => {
            console.log("Error",err)
            res.status(404).json({
            message: "Error occured. Try again",
        })
    });
   
};

//router.put('/edituser', edituser);
exports.edituser = (req, res) =>{
    User.findOneAndUpdate({_id:req.body._id},req.body,function(error, results) {
        if (error) {
            console.log('Updating User Failed ',error);
            res.json({success:false});
        }
        else{
            console.log('Updated User Details');
            res.json({success:true});
        }   
});
}

//router.put('/showphone/:id', showphone);
exports.showphone = (req, res) =>{
    User.findOneAndUpdate({_id:req.params._id},{show_phone:!show_phone},function(error, results) {
        if (error) {
            console.log('Updating User Failed ',error);
            res.json({success:false});
        }
        else{
            console.log('Updated User Details');
            res.json({success:true});
        }   
});
}

//router.put('/showaddress/:id', showaddress);
exports.showaddress = (req, res) =>{
    User.findOneAndUpdate({_id:req.params.id},{show_address:!this.show_address},function(error, results) {
        if (error) {
            console.log('Updating User Failed ',error);
            res.json({success:false});
        }
        else{
            console.log('Updated User Details');
            res.json({success:true});
        }   
});
}

//router.delete('/removeuser', removeuser);
exports.removeuser = (req, res) => {
    User.deleteOne({_id:req.params.id }, function(error, results) {
        if (error) {
            return next(error);
        }
        console.log('Deleted User');
        res.json(results);
    });
};
//router.post('/loginuser', loginuser);
exports.loginuser = (request, response) => {
   User.findOne({
      email:request.body.email
  }).then(user=> {
        if(user)
        {
            Bcrypt.compare(request.body.password, user.password, function(err, res) {
                if(res) {
                 // Passwords match
                    user.isLoggedin = true;
                    user.save().then(user => console.log("User Logged in.")).catch((err)=>{throw err;});
                    response.json({user: user,success:true,token:user._id,message:"User Logged in."})
                } else {
                 // Passwords don't match
                console.log('User does not exist') 
                response.json({error: 'User does not exist',success:false})
                } 
              });
          }
          else 
          {
              console.log('User does not exist')
              response.json({error: 'User does not exist',success:false})
          }

      })
    .catch(err=>
      {
        console.log('Error: ',err)
        response.json({error: err,success:false})
      })
};

//router.post('/logoutuser', logoutuser);
exports.logoutuser = (request, response) => {
   User.findOne({
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
                console.log('User does not exist') 
                response.json({error: 'User does not exist',success:false})
                } 
              });
          }
          else 
          {
              console.log('User does not exist')
              response.json({error: 'User does not exist',success:false})
          }

      })
    .catch(err=>
      {
          response.send('error: '+err)

      })
};

//router.get('/getuserbycity/:city', getuserbycity);
exports.getuserbycity = (req, res, next) => {
    User.find({city:req.params.city})
    .then((result) => {
        res.status(200).json({
            result
        });
    })
    .catch(err => response.send('error: '+err));
};


