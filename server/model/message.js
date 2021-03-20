const { Double } = require('bson');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageschema = new Schema(
    {
        user_id:  {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,

        },
        worker_id:  {
            type: Schema.Types.ObjectId,
            ref: "Worker",
            required: true,
        },
        dateCreated:{
             type: Date,
             default: Date.now
        },
        message:{
            type: String,
            required: true,
        },
        message_type:{
            type: String,
            required: true,
            default: "text"
        },
        file:{
            data: Buffer,
            contentType: String
        },
        
         
         
    }
);


module.exports = Message = mongoose.model('Message', messageschema);