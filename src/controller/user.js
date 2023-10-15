import userModel from "../model/user.js";
import bcryptjs from "bcryptjs";
import mongoose from "mongoose";

const userController = {
  getAll: async (req, res) => {
    const users = await userModel.find();
    return res.json(users);
  },
  searchAll: async (req, res) => {
    const searchTerm = req.params.search;
    const regex = new RegExp(searchTerm, "i");
    const users = await userModel.find({
      $or: [{ name: regex }, { email: regex }],
    });
    return res.json(users);
  },
  getSingle: async (req, res) => {
    const { id } = req.params;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  },
  getByEmail: async (req, res) => {
    const { email } = req.params;
    const user = await userModel.find({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  },
  signUp: async (req, res) => {
    const { name, username, email, phone, password } = req.body;

    const hashPassword = await bcryptjs.hash(password, 10);

    const user = await userModel.create({
      name,
      username,
      email,
      phone,
      password: hashPassword,
    });

    return res.json({ message: "User created", user });
  },

  update: async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const user = await userModel.findById(id);
    if (!user) return res.json({ message: "User not found" });
    user.name = body.name;
    user.email = body.email;
    user.bio = body.bio;
    await user.save();
    return res.json({ message: "User Updated", user });
  },

  addBio: async (req, res) => {
    const { email } = req.params;
    const user = await userModel.findOne({ email: email });
    if (!user) return res.json({ message: "User not found" });
    const bio = req.body;
    user.bio = bio;
    await user.save();
    return res.json({ message: "Bio Added" });
  },

  updateFollowers: async (req, res) => {
    const { user_id, follower_id } = req.params;
    const user = await userModel.findById(user_id);
    const follower = await userModel.findById(follower_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!follower) {
      return res.status(404).json({ message: "Follower not found" });
    }
    const followerId = new mongoose.Types.ObjectId(follower_id);
    const followingId = new mongoose.Types.ObjectId(user_id);

    let followerResult = user.followers.findIndex((elem) =>
      elem.equals(followerId)
    );
    let userResult = follower.following.findIndex((elem) =>
      elem.equals(followingId)
    );

    // Add Follower if not already available
    if (followerResult == -1) {
      user.followers.push(followerId);
      await user.save();
    } else {
      // Remove Follower if already available
      user.followers.splice(followerResult, 1);
      await user.save();
    }

    // Add Following if not already available
    if (userResult == -1) {
      follower.following.push(followingId);
      await follower.save();
      return res.json({ message: "1 Following added", user, follower });
    } else {
      // Remove Following if already available
      follower.following.splice(userResult, 1);
      await follower.save();
      return res.json({ message: "1 Following removed", user, follower });
    }
  },

  updateFollowings: async (req, res) => {
    const { user_id, following_id } = req.params;
    const user = await userModel.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const followingId = new mongoose.Types.ObjectId(following_id);

    let result = user.following.findIndex((elem) => elem.equals(followingId));

    // Add Following if not already available
    if (result == -1) {
      user.following.push(followingId);
      await user.save();
      return res.json({ message: "1 Following added", user });
    } else {
      // Remove Following if already available
      user.following.splice(result, 1);
      await user.save();
      return res.json({ message: "1 Following removed", user });
    }
  },

  delete: async (req, res) => {
    const id = req.params.id;
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await userModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "User deleted" });
  },
};

export default userController;
