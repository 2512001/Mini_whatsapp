const mongoose = require('mongoose');
const moment = require('moment-timezone');

const chatSchema = new mongoose.Schema({
    from: {
        type : String,
        required :  true
    },
    to: {
        type :  String,
        required : true
    },
    msg: {
        type : String,
        trim : true
    },
    created_at: {
        type: Date,
        default: Date.now, // Store the date in UTC by default
        get: function(value) {
            // Convert UTC date to local date before returning
            return moment(value).tz('Asia/Kolkata').format(); // Convert to Mumbai timezone
        },
        set: function(value) {
            // If a new date is set, convert it to UTC
            return moment(value).tz('Asia/Kolkata').utc().format(); // Convert to UTC
        }
    }
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
