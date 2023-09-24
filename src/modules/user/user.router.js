import { auth } from './controller/middleware/authontication.js';
import*as userController from './controller/user.js'
import{Router} from "express";
const router =Router();

/*const temp =(fn)=>{
    return(req,res,next)=>{
        fn(req,res,next).catch(err=>{
            return res.json({messsage:"error" ,err})
        })
    }
}*/
router.get('/',auth,userController.getUsers)
//router.post('/login',userController.login)
router.put('/changePass',auth,userController.changePass)
router.put("/:id" ,auth,userController.updateUser)
router.delete("id",auth,userController.deleteUser)
router.delete("//:id",auth,userController.softdeleteUser)
router.get('/logout',userController.logout)
export default router