import connectDB from '../DB/connection.js'
import userRouter from'./modules/user/user.router.js'
import taskRouter from'./modules/task/task.router.js'
import autherRouter from './modules/auth/auth.router.js'
const bootstrap=(app,express)=>{
    app.use(express.json())
    app.use("/auth" , autherRouter)
    app.use("/user",userRouter)
    app.use("/task",taskRouter)
    app.use("*" ,(req,res,next)=>{
        return res.json({message: "in valid routing"})
    })
    connectDB()
} 

export default bootstrap