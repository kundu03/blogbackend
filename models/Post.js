const mongoose = require("mongoose");

mongoose.set('strictQuery', true);
 
const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    }, desc: {
        type: String,
        required: true,
    }, photo: {
        type: String
    }, username: {
        type: String,
        required: true
    }, categories: {
        type: Array,
    }
    }, {timestamps: true} 
);

module.exports = mongoose.model("Post",PostSchema);