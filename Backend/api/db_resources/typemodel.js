const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const typeSchema = new Schema({
   customerClass: { 
   type: String
   }
})

module.exports = mongoose.model('types', typeSchema);
