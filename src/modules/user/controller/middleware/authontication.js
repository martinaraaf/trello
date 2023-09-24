
import jwt from 'jsonwebtoken'
import userModel from '../../../../../DB/model/user.model.js';

export const auth = async(req,res,next)=>{
    const{authorization}=req.headers;
    console.log({authorization})
    if(!authorization){
        return next
        (new Error("authorization is required ",{cause:401}))
    }
    const decoded= jwt.verfiy(authorization , 'hamadasalem3lahambozo')
    console.log({decoded});
    if(!decoded?.id){
        return next
        (new Error("in-valid token payload",{cause:400}))

    }
    const user= await userModel.findById(decoded.id)
    console.log({user});
    if(!user){
        return next(new Error("not reqister account",{cause:404}))
    }
req.user=user
return next()
}