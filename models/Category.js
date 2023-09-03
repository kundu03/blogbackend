const mongoose = require("mongoose");

mongoose.set('strictQuery', true);
 
const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true 
    }
    }, {timestamps: true} 
);

module.exports = mongoose.model("Category",CategorySchema);