import chatModel from "../model/chat.model.js";

const chatController = {
  // Get all messages in a conversation
  getAllMessages: async (req, res) => {
    const { username1, username2 } = req.params;

    try {
      // Find all messages in the conversation between username1 and username2
      const messages = await chatModel.find({
        $or: [
          { sender: username1, recipient: username2 },
          { sender: username2, recipient: username1 },
        ],
      }).sort({ timestamp: 1 });

      return res.json(messages);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Send a new message
  sendMessage: async (req, res) => {
    
    const {sender,recipient, content,channel } = req.body;

    try {
      // Create a new message
      const newMessage = await chatModel.create({
        sender: sender,
        recipient: recipient,
        content:content,
        channel: channel, // You can generate a unique channel name
      });

      // Save the message to the database
      await newMessage.save();


      return res.json({ message: 'Message sent successfully', newMessage });
    } catch (error) {
      console.log(error);
    }
  },
};

export default chatController;
