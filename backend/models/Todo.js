const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Todo Schema

const todoSchema  = new Schema({
    title: {
        type: String,
        required: true,
      },
      completed: {
        type: Boolean,
        default: false,
      },
});


module.exports = mongoose.model('todo', todoSchema );


  
 