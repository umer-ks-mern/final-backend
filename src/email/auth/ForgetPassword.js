import userModel from "../../model/user.js";
import bcryptjs from 'bcryptjs';


const newPasswordController= {
   
    setPassword: async (req, res) => {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email: email });
      if (!user) 
        return res.json({ message: "Invalid Request" });
        const hashPassword = await bcryptjs.hash(password, 10);
    user.password = hashPassword;
    await user.save();
    return res.json({message:"Passsword Changed1"});    

    }
};

export default newPasswordController;