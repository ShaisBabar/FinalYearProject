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
             required: true,
             default: Date.now
        },
        description:{
            type: String,
            required: true,
            default: "None."
        },
        starting_time:{
            required:true,
            default: Date.now,
            type: Date,
        },
        expected_time:{
            type: String,
            required: true,
            default: "Unknown."
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
         
    }
);


module.exports = Job = mongoose.model('Job', jobschema);