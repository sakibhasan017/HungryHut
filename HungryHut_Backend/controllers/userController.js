import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

//Log In User

const logInUser=async (req,res)=>{
  const {email,password}=req.body;
  try {
    const user=await userModel.findOne({email});
    if(!user){
        return res.json({success:false,message:"User Doesn't Exist"})
    }

    const isMatch= await bcrypt.compare(password,user.password);
    if (!isMatch) {
      return res.json({success:false,message:"Invalid Credentials"});
    }
    
    const token=createToken(user._id);
    res.json({success:true,token})


  } catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
  }
}

//Register User

const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

const registerUser=async(req,res)=>{
  const {name,password,email,petName}=req.body;
  try {
    const exist=await userModel.findOne({email});
    if(exist){
        return res.json({success:false,message:"User Already Exist"})
    }

    if(!validator.isEmail(email)){
        return res.json({success:false,message:"Please Enter Valid Email"})
    }
    
    if(password.length<8){
        return res.json({success:false,message:"Password should be greater than 8 character"})
    }

    const salt=await bcrypt.genSalt(10)
    const hashedPassword= await bcrypt.hash(password,salt)

    const newUser=new userModel({
      name:name,
      email:email,
      password:hashedPassword,
      petName: petName
    })

    const user= await newUser.save()
    const token=createToken(user._id)
    res.json({success:true,token})

  } catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
  }
}

// Change Pass

const changePass= async (req,res)=>{
  const {currentPass,newPass} = req.body;
  try {
    const user = await userModel.findById(req.userId);
    if (!user) return res.json({ success: false, message: 'User not found' });
    const isMatch = await bcrypt.compare(currentPass, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: 'Current password is incorrect' });
    }
    if (newPass.length < 8) {
      return res.json({ success: false, message: 'Password must be at least 8 characters' });
    }
    const hashedPassword = await bcrypt.hash(newPass, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    console.log(error);
    res.json({success: false,message: "Error" });
  }
}

const getUserProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId).select("name email");
    if (!user) return res.json({ success: false, message: "User not found" });

    res.json({ success: true, user });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: "Error" });
  }
};


const resetPassword = async (req, res) => {
  const { email, petName, newPassword } = req.body;

  try {
    const user = await userModel.findOne({ email }); 
    if (!user) return res.json({ success: false, message: "User not found" });

    if (user.petName !== petName) {
      return res.json({ success: false, message: "Security answer is incorrect" });
    }

    if (newPassword.length < 8) {
      return res.json({ success: false, message: "Password must be at least 8 characters" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error resetting password" });
  }
};




export {logInUser,registerUser,changePass,getUserProfile,resetPassword}