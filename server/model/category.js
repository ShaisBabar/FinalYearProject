const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catschema = new Schema(
    {
       
      name: {
        type: String, 
        required: true 
      },
      description: {
        type: String, 
      },
         
    }
);


module.exports = Category = mongoose.model('Category', catschema);