var Message = require('../model/message');
var Worker_ = require('../model/worker');
var User = require('../model/user');
var _ = require('lodash');


//router.get('/getmessagesbyuser/:id', getmessagesbyuser);
exports.getmessagesbyuser = (req, res, next) => {
    Message.find({user_id:req.params.id})
    .then((result) => {
        res.status(200).json({
            result
        });
    })
    .catch(err => console.log(err));
};

//router.get('/getconversations/:userid/:workerid', getconversations);
exports.getconversations = (req, res) => {
    Message.find({user_id:req.params.userid,worker_id:req.params.workerid})
    .then((result) => {
        console.log("Messages fetched successfully.")
        res.status(200).json({
            result:result,success:true
        });
    })
    .catch(err => {
    console.log("Messages fetch unsuccessfull.")
    console.log(err)
    res.status(400).json({
        success:false
    });});
};

//router.get('/getmessagesbyworker/:id', getmessagesbyworker);
exports.getmessagesbyworker = (req, res, next) => {
    Message.find({worker_id:req.params.id})
    .then((result) => {
        res.status(200).json({
            result
        });
    })
    .catch(err => console.log(err));
};

//router.post('/sendmessage', sendmessage);
exports.sendmessage = async (req, res) => {
    const message = await Message(req.body);
    message.save().then(e=>{
        console.log("ll",e)
        res.status(200).json({
            msg: e,success:true
        });
    
    }).catch(err=>{
        console.log(err)
        res.status(200).json({
            success:false
        });
    });
};
//router.get('/getalluserconversations/:id', getalluserconversations);
exports.getalluserconversations = (req, res, next) => {
    Message.find({user_id:req.params.id}).populate("worker_id")
    .then((result) => {
        // var ids = [];
        // result.forEach(element => {
        //     ids.push(element.worker_id)
        // });
        var ids = result.filter((v,i,a)=>a.findIndex(t=>(t.worker_id === v.worker_id))===i)
        console.log(ids)
        res.status(200).json({
            result:ids,success:true
        });
    })
    .catch(err =>  res.status(200).json({
        success:false
    }));
};
//router.get('/getallworkerconversations/:id', getallworkerconversations);
exports.getallworkerconversations = (req, res, next) => {
    Message.find({worker_id:req.params.id}).populate("user_id")
    .then((result) => {
        var ids = result.filter((v,i,a)=>a.findIndex(t=>(t.worker_id === v.worker_id))===i)
        console.log(ids)
        res.status(200).json({
            result
        });
    })
    .catch(err => console.log(err));
};

//router.post('/getcovnersationsbyworker', getcovnersationsbyworker);
exports.getcovnersationsbyworker = (req, res, next) => {
    Worker_.find(
        { "name": { "$regex": req.params.name, "$options": "i" } },
    ).then((workers) => {
        var work = [];
        workers.forEach(element => {
            work.push(mongoose.Types.ObjectId(element._id))
        });
        Message.find({
            worker_id: { $in: work}
        }).then((result) => {
            res.status(200).json({
                result
            });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
    
};

//router.post('/getcovnersationsbyuser', getcovnersationsbyuser);
exports.getcovnersationsbyuser = (req, res, next) => {
    User.find(
        { "name": { "$regex": req.params.name, "$options": "i" } },
    ).then((users) => {
        var user = [];
        users.forEach(element => {
            user.push(mongoose.Types.ObjectId(element._id))
        });
        Message.find({
            user_id: { $in: user}
        }).then((result) => {
            res.status(200).json({
                result
            });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
    
};