import postModel from "../model/post.js";
// import notification from "./notification.js";
const commentController = {
  getAll: async (req, res) => {
    const { id } = req.params;
    const post = await postModel.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    return res.json(post.comments);
  },

  getSingle: async (req, res) => {
    const { post_id, comment_id } = req.params;
    const post = await postModel.findById(post_id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = post.comments.find(
      (comment) => comment._id.toString() === comment_id
    );

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    return res.json(comment);
  },

  add: async (req, res) => {
    const { id } = req.params;
    const post = await postModel.findById(id).populate("user_id");

    const body = req.body;
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (body) {
      post.comments.push(body);
    }

    await post.save();


    // // create a notification when a comment is added
    // const recipientId = post.user_id._id;
    // const senderId = req.user.id;
    // const type = 'comment';
    // const content = 'New comment on your Post.';

    // // Call the notification functions
    // await notification.createNotification(recipientId, senderId, type, content);
    // return res.json({ message: "Comment added", post });
  },

  addReply: async (req, res) => {
    const { post_id, comment_id } = req.params;
    const post = await postModel.findById(post_id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const body = req.body;

    if (!body) {
      return res.status(400).json({ message: "Invalid reply data" });
    }

    const comment = post.comments.find(
      (comment) => comment._id.toString() === comment_id
    );

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    comment.replys.push(body);

    await post.save();

    // // Create notification function when a reply is added
    // const recipientId = comment.user_id; 
    // const senderId = req.user.id; 
    // const type = 'reply';
    // const content = 'You have a reply to your comment.';
    
    // // Call the createNotification function
    // await notificationController.createNotification(recipientId, senderId, type, content);
    // return res.json({ message: "Reply added", post });
  },
};

export default commentController;
