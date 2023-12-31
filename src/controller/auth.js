import userModel from "../model/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import loginEmail from "../email/auth/login.js";

const signInController = {
  signIn: async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    const user = await userModel.findOne({ email });

    if (!user) {
      console.log("user not found");
      return res.json("User Not Found");
    }

    const result = await bcryptjs.compare(password, user.password);

    if (result) {
      const token = jwt.sign({ user }, "cghcghcgtyfuiuyggtctcghvhgvgftfukfhgkvkvkgctcgkt", {
        algorithm: "HS256",
        expiresIn: "24h",
      });
      loginEmail(user);

      return res.json({ message: "Login Successful !!", token: token });
    } else {
      return res.status(404).json("Invalid Credentials !");
    }
  },
};

export default signInController;
