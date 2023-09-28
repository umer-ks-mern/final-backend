import postModel from "../model/post.js";

const likeController = {
  updateLikes: async (req, res) => {
    const { id } = req.params;
    const post = await postModel.findById(id);

    const { user_id } = req.body;

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    let result = post.likes.findIndex((elem) => elem.user_id == user_id);
    console.log(user_id);
    console.log(result);
    //Add like if not already Avaible
    if (result == -1) {
      post.likes.push({ user_id });
      await post.save();
      return res.json({ message: "1 Like added", post });
    } else {
      //Remove like if already Avaible
      post.likes.splice(result, 1);
      await post.save();
      return res.json({ message: "1 Like removed", post });
    }
  },
};
export default likeController;
