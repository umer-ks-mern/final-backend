import postModel from "../model/post.js";

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
    return res.json({ message: "Comment added", post });
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
    return res.json({ message: "Reply added", post });
  },
};

export default commentController;
