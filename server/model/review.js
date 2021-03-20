const { Double } = require('bson');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewschema = new Schema(
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
        review_text:{
            type: String,
            required: true,
        },
        sentiment:{
            type: String,
            required: true,
            default: "text"
        },
        rating:{
            type: Number,
            required: true,
        },
           
    }
);


module.exports = Review = mongoose.model('Review', reviewschema);