import userModel from "../../../../DB/model/user.model.js"
import jwt from "jsonwebtoken";

export const getUsers= async(req,res)=>{
     
     //const users=await userModel.find()
    return res.json({message:"done", user:req.user})
} 

//login
/*export const login = async (req,res)=>{
try {
    const {email,password}=req.body;
const user = await userModel.findOne({email,password})

if(!user){
    return res.json({message:"invalid" })
}
return res.json({message:"done" ,user})
} catch (error) {
    return res.json({message:"catch error" ,error})
}
}*/



/*const User = require('./models');

// Route to change password
export const changePass= async (req, res) => {
  const { username, oldPassword, newPassword } = req.body;

  try {
    // Find the user
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the old password matches
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    console.error('Error changing password', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};*/




/*exports.changePass=async(req,res)=>{
    console.log("change password")
    try {
        const {userid}=req.params;
        const salt=await bcrypt.genSalt(10);
  
        const password=await bycrypt.hash(req.body.password ,salt)
        const userPassword =await user.findByIdandUpdate({_id:userid},{password:password},{new:true});
        return res.status(200).json({statues:true ,data:userPassword});

    } catch (error) {
                return res.status(400).json({statues:false,error:"error" });

    }

}*/







export const changePass=async (req, res) => {
    // Check if the user is logged in.
    if (!req.user) {
      res.redirect('/login');
      return;
    }
    const { newPassword, oldPassword } = req.body;
    if (!newPassword || newPassword.length < 6) {
      res.status(400).send('Invalid password.');
      return;
    }
    // Hash the new password.
    const hashedPassword = await bcrypt.hashSync(newPassword, 10);
    // Update the user's password in mongoose.
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { password: hashedPassword },
      { new: true }
    );
    res.redirect('/');
};


//update 

/*const update = async (req ,res )=>{
    const user = User.findById(req.params.id);
    if (!user) {
        res.status(404).send('User not found');
        return;
      }
      user.userName = req.body.userName;
  user.age = req.body.age;
  // Save the user to the database.
  user.save((err) => {
    if (err) {
      res.status(500).send('Error saving user');
      return;
    }
}
  )}*/
//update 
  export const updateUser = async(req, res, next) => {
    const { id } = req.params;
    const { userName , age } = req.body;
    console.log( {id ,  userName, age });


    try {
      // Find the user by ID and update the age and username
      const user = await userModel.findByIdAndUpdate(id, { age, userName }, { new: true });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      return res.json({ message: 'User updated successfully', user });
    } catch (error) {
      return res.status(500).json({ message: 'An error occurred', error });
    }
  };

  //delete
  export const deleteUser =async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find the user by ID and delete it
      const user = await userModel.findByIdAndDelete(id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      return res.json({ message: 'User deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'An error occurred', error });
    }
  };

  //soft delete
  export const softdeleteUser=async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find the user by ID and update the isDeleted flag and deletedAt timestamp
      const user = await userModel.findByIdAndUpdate(
        id,
        { isDeleted: true, deletedAt: new Date() },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      return res.json({ message: 'User soft deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'An error occurred', error });
    }
  };
  
  
//logout

export const logout= (req, res) => {
  
  return res.json({ message: 'Logout successful' });
};


  
