import { Schema ,model } from "mongoose";

const userSchema = new Schema({
userName:String,
email: {type:String,required:true ,unique :true},
password:{type:String,required:true },
phone:String,
age:Number,
gender: {
    type: String,
    default: "Male",
    enum: ['Male', 'Female']
},
deleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: {
    type: Date,
    default: null,
  },


},{timestamps:true})

const userModel = model("user", userSchema);
export default userModel