import userModel from "../../../../DB/model/user.model.js";
import bcrypt from 'bcryptjs'
const asyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(error => {
      return res.json({
        message: error.message,
        error,
        stack: error.stack
      })

    })
  }
}

import jwt from 'jsonwebtoken'
import sendEmail from "../../../../utils/email.js";
import * as validators from '../validation.js'
export const signup = async (req, res, next) => {







  try {
    const { userName, email, password } = req.body;
    console.log({ userName, email, password });






    const validationResult = validators.signup.validate(req.body , {abortEarly:false});
return res.json({message:"validation error" , validationResult})



    const checkUser = await userModel.findOne({ email });
    if (checkUser) {
      return res.json({ message: "email exists" });
    }

    const hash = bcrypt.hashSync(password, 8);
    req.body.password = hash;

    const user = await userModel.create(req.body);
const token =jwt.sign({id:user._id ,email :user.email}, process.eventNames,EMAIL_SIGNATURE)
    const html = `<a href="http://localhost:3000/auth/confirmEmail/${token}">confirm email  </a>`;
    await sendEmail({ to: email, subject: "confirmation email", html });

    return res.json({ message: "done", user });
  } catch (error) {
    return res.json({ message: error.message, error, stack: error.stack });
  }
};

export const confirmEmail =asyncHandler(async(req,res,next)=>{
  const {token}=req.params;
  console.log({token})
  //hnfok token
  const decoded=jwt.verify(token ,process.env.EMAIL_SIGNATURE);
  console.log(decoded);
  const user=await userModel.findByIdAndUpdate(decoded.id ,{confirmEmail:true})
  return user? res.json({message:"done"}): next(new Error("not requstir account",{cause:404}))
})


export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    return next(new Error("email not exist", { cause: 404 }))
  }

  console.log({ FE: password, HashDBPassword: user.password });

  const match = await bcrypt.compare(password, user.password);
  console.log({ match });

  if (!match) {
    return res.json({ message: "Invalid login data" });
  }
  const token = jwt.sign({
    userName: user.userName, id: user._id
  }, "hamadaslm3la7ambozo",
    { expiresIn: 60 * 60 }
  )
  return res.json({ message: "Done", token });
});