const mongoose = require('mongoose');
require('mongoose-type-email');

const Schema = mongoose.Schema;

const workerschema = new Schema(
    {
       email: {
         type:mongoose.SchemaTypes.Email,
         required: true,
         index: { unique: true }
       },
       password: {
         type: String, 
         required: true 
       },
       name: {
        type: String, 
        required: true 
      },
      phoneno: {
        type: String, 
        required: true,
        default:""
      },
       isLoggedin:{
        type: Boolean,
        default: false
       },
       dateCreated:{
         type: Date,
         default: Date.now
       },
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
         categories: [
           {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true,

           }
         ],
         avg_rating:{
           type:Number,
           default:0,
           required:true
         },
         completed_jobs:{
          type:Number,
          default:0,
          required:true
        },
         show_address:{
          type:Boolean,
          default:true,
          required:true
        },
        show_phone:{
          type:Boolean,
          default:true,
          required:true
        }

         
         
    }
);


module.exports = Worker_ = mongoose.model('Worker', workerschema);