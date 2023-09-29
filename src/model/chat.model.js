import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  sender: {
    type:String,
    required:true   
},
recipient: {
    type:String,
    required:true   
},
  content:  {
    type:String,
    required:true   
},
  channel:  {
    type:String,
    required:true   
}, // Unique channel name for the conversation
  timestamp: { type: Date, default: Date.now },
});

const chatModel= mongoose.model('Message', messageSchema);
export default chatModel
