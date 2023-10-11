import userModel from "../model/user.js";
import bcryptjs from "bcryptjs";

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
    const id  = req.params.id;
    const user = await userModel.findById(id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  },
  getByEmail: async (req, res) => {
    const email  = req.params.email;
    const user = await userModel.find({email:email});
    
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
    const body=req.body;
    const user = await userModel.findById(id);
    if (!user) 
      return res.json({ message: "User not found" });
 user.name=body.name;
 user.email=body.email;
 user.bio=body.bio;
  await user.save();
    return res.json({ message: "User Updated", user });
  },

  addBio: async (req, res) => {
    const { email } = req.params;
    const user = await userModel.findOne({ email: email });
    if (!user) 
      return res.json({ message: "User not found" });
 const bio=req.body;
 user.bio=bio;
  await user.save();
    return res.json({ message: "Bio Added" });
  },

  updateFollowers: async (req, res) => {
    const { user_id, follower_id } = req.params;
    const user = await userModel.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    let result = user.followers.findIndex(
      (elem) => elem.follower_id == follower_id
    );
    //Add Follwer if not already Avaible
    if (result == -1) {
      user.followers.push({ follower_id });
      await user.save();
      return res.json({ message: "1 Follwer added", user });
    } else {
      //Remove Follwer if already Avaible
      user.followers.splice(result, 1);
      await user.save();
      return res.json({ message: "1 Follwer removed", user });
    }
  },

  updateFollowings: async (req, res) => {
    const { user_id, following_id } = req.params;
    const user = await userModel.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    let result = user.following.findIndex(
      (elem) => elem.following_id == following_id
    );
    //Add Follwing if not already Avaible
    if (result == -1) {
      user.following.push({ following_id });
      await user.save();
      return res.json({ message: "1 Follwer added", user });
    } else {
      //Remove Follwing if already Avaible
      user.following.splice(result, 1);
      await user.save();
      return res.json({ message: "1 Follwer removed", user });
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
