import { Schema ,model } from "mongoose";

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['toDo', 'doing', 'done'], default: 'toDo' },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
  assignTo: { type: String, required: true },
  deadline: { type: Date, required: true },
});



const taskModel = model("task", taskSchema);
export default taskModel

