import joi from 'joi'

//object ali gailk mn al front end
export const signup= joi.object
(
    {
        userName:joi.string().alphanum().min(3).max(20).required,
        email:joi.string().email().required(),
        password:joi.string().pattern(new RegExp()).required,
        age: joi.number().intger().postive().min(18).max(90)
    }
).required//.options({allowUknown:true})