const mongoose = require('mongoose');
require('mongoose-type-email');

const Schema = mongoose.Schema;

const userschema = new Schema(
    {
       email: {
         type:mongoose.SchemaTypes.Email,
         required: true,
         index: { unique: true },
       },
       password: {
         type: String, 
         required: true,
       },
       name: {
        type: String, 
        required: true,
        default:"Anonymous"
      },
      phoneno: {
        type: String, 
        required: true,
      },
       isLoggedin:{
        type: Boolean,
        default: false
       },
       profile_picture:{
          data: Buffer,
          contentType: String
         },
       street_address:{
        type:String,
        required:true,
       },
       city:{
        type:String,
        required:true,
       },
       dateCreated:{
        type: Date,
        default: Date.now
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


module.exports = User = mongoose.model('User', userschema);