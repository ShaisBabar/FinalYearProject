const { Double } = require('bson');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const jobschema = new Schema(
    {
        user_id:  {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,

        },
        dateCreated:{
             type: Date,
             default: Date.now
        },
        description:{
            type: String,
            required: true,
            default: "Will discuss afterwards."
        },
        starting_time:{
            required:true,
            default: Date.now,
            type: Date,
        },
        finish_time:{
            required:true,
            type: Date,
            default: Date.now
        },
        expected_time:{
            required:true,
            type: Date,
            default: Date.now
        },
        min_payment:{
            required:true,
            type: Number,
            required:true,
        },
        max_payment:{
            required:true,
            type: Number,
            required:true,
        },

        categories: [
            {
             type: Schema.Types.ObjectId,
             ref: "Category",
             required: true,
            }
          ],
         street_address:{
          type:String,
          required:true,
         },
         city:{
          type:String,
          required:true,
         },
         area:{
          type:String,
          required:true,
         },
         applicants: [
             {
                 worker_id:{
                    type: Schema.Types.ObjectId,
                    ref: "Worker",
                    required: true,
                 },
                 message:{
                    type: String,
                 },
                 Date_Applied:{
                     type:Date,
                     default:Date.now
                 }
             }
         ],
         assigned_to:{
            type: Schema.Types.ObjectId,
            ref: "Worker",
         },
         is_completed:{
             type:Boolean,
             default:false
         },
         remarks:{
             type: String,
             default: ""
         },
         rating:{
            type: Number,
            default: 0
        }
        
         
    }
);


module.exports = Job = mongoose.model('Job', jobschema);