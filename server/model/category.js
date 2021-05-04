const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catschema = new Schema(
    {
       
      name: {
        type: String, 
        required: true 
      },
      name: {
        type: String, 
        required: true,
        default:'7.png'
      },

    }
);


module.exports = Category = mongoose.model('Category', catschema);