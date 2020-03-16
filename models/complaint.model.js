const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComplaintSchema = new Schema({
    id:{
        type: Number,
        required: false
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
    issue:{
        _id: {type: mongoose.Schema.Types.ObjectId},
        name: {type: String}
    },
    description: String,
    status: {
        type: String,
        required: true
    },
    createdOn: {
        type: Date,
        required: false
    },
    lastUpdatedOn: {
        type: Date,
        required: false
    }
});

var Complaint = mongoose.model("Complaint", ComplaintSchema);
module.exports = { Complaint };