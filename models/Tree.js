const mongoose = require('mongoose');

const TreeSchema = new mongoose.Schema({

  root: []
     
      
    
  

});

module.exports = mongoose.model("Tree", TreeSchema);
