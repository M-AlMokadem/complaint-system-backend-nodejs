const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComplaintSchema = new Schema({
    id:{
        type: Number,
        required: true
    },
    staffId:{
        type: String,
        required: true
    },
    building:{
        _id: {type: mongoose.Schema.Types.ObjectId},
        name: {type: String}
    },
    floor:{
        _id: {type: mongoose.Schema.Types.ObjectId},
        name: {type: String}
    },
    status:{
        _id: {type: mongoose.Schema.Types.ObjectId},
        name: {type: String}
        }
});

var Complaint = mongoose.model("Complaint", ComplaintSchema);
module.exports = { Complaint };