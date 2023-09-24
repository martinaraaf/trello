import { auth } from '../user/controller/middleware/authontication.js';
import * as taskController from'./controller/task.js'
import { Router } from "express";
const router=Router()
router.post("/ ",auth,taskController.addTask)
router.put('/:id' ,auth,taskController.update)
router.delete('/:id' ,auth,taskController.deleteTask)
router.get('/task' ,auth,taskController.getTask)
router.get('/tasks' ,auth,taskController.getTasks)



export default router