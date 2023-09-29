import { io } from '../app.js';
import chatModel from '../model/chat.model.js';

const chatController = {
  // Get all messages in a conversation
  getAllMessages: async (req, res) => {
    const { sender,recipient} = req.body;

    try {
      const messages =  await chatModel.find({
        $or: [
          { sender: sender, recipient: recipient },
          { sender: sender, recipient: sender },
        ],
      }).sort({ timestamp: 1 });

      return res.json(messages);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  sendMessage: async (req, res) => {
    
    const {sender,recipient, content ,channel} = req.body;

    try {
      // Create a new message
      const newMessage = await chatModel.create({
        sender: sender,
        recipient: recipient,
        content:content,
        channel: channel, 
      });

      await newMessage.save();

      io.emit('message', newMessage); 

     
      return res.json({ message: 'Message sent successfully', newMessage });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  },
};

export default chatController;
