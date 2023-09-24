import taskModel from "../../../../DB/model/task.model.js";


export const addTask = async (req, res) => {
    try {
      const { title, description, assignTo, deadline } = req.body;
      const userId = req.user.userId;
      const task = new Task({ title, description, assignTo, deadline, userId });
      await task.save();
      res.status(201).json(task);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  //update
  export const update=async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) return res.status(404).json({ error: 'Task not found' });
      if (task.userId.toString() !== req.user.userId)
        return res.status(403).json({ error: 'Forbidden' });
  
      await Task.findByIdAndDelete(req.params.id);
      res.json({ message: 'Task deleted successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

  //delete

  export const deleteTask= async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) return res.status(404).json({ error: 'Task not found' });
      if (task.userId.toString() !== req.user.userId)
        return res.status(403).json({ error: 'Forbidden' });
  
      await Task.findByIdAndDelete(req.params.id);
      res.json({ message: 'Task deleted successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
//get all tasks
export const getTask =async (req, res) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  export const getTasks=  async (req, res) => {
    try {
      const userId = req.user.userId;
      const tasks = await Task.find({ userId });
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  

  
  
  








/*async (req,res,next)=>{
  const{title, description,userId}=req.body;
  console.log({title,description,userId});
  const task= await taskModel.create({title,description,userId})
 return res.json({message:"done",task})
}*/