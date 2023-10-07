import mongoose from "mongoose"
const notificationSchema = new mongoose.Schema({
    recipient_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    sender_id : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    type : String,
    content: String,
    is_read : Boolean,
    created_At : {
        type: Date,
        default: Date.now
    },
});

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;