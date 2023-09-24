import multer, {diskStorage}from "multer";
import { nanoid } from "nanoid";
import fs from "fs";

export const uploadFile=(customPath)=>{
    const storage=diskStorage({
        filename:(req,file,cb)=>{
            const filename=
            `${nanoid()}__${file.originalname}`
            cb(null,filename)
        },
        destination:(req,file,cb)=>{
            const userId=req.res._id;
            const folderName=`uploads/${userId}/${customPath}`
if(!fs.existsSync(folderName)){
    fs.mkdirSync(folderName,{recursive:true})
}
cb(null,folderName)
        }
    })
}