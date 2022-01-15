import { isEmpty, validate } from "class-validator";
import { Request, Response, Router } from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import User from "../entity/User";
import auth from "../middleware/auth";
const mapErrors = (errors: Object[]) => {
        return errors.reduce((prev:any,err:any)=>{
        prev[err.property]= Object.entries(err.constraints)[0][1]
        return prev
    },{})
}
const register = async (req:Request, res:Response) => {
    const {email, username, password}= req.body
    try {
        let myerrors : any ={}
        const emailUser =await User.findOne({email})
        const usernameUser = await User.findOne({username})

        if(emailUser){
            myerrors.email = 'Email is already taken'
        }
        if(usernameUser){
            myerrors.username= 'Username is already taken'
        }

        if(Object.keys(myerrors).length>0){
            return res.status(400).json({myerrors})
        }

        const user = new User({email, username, password})

        const errors = await validate(user)
        if (errors.length>0){
            return res.status(400).json(mapErrors(errors))
        }
        
        await user.save()

        return res.json(user)
    } catch (error) {
        console.log(error)
        res.status(404).json({error: 'Unautheticated'})
    }
}

const login = async (req:Request, res: Response) => {
    const {username, password } = req.body
    try {
        let errors: any ={}
        if(isEmpty(username) || isEmpty(password)) errors.username="Fields must not be empty"
        if(Object.keys(errors).length>0){
            return res.status(400).json(errors)
        }
       const user= await User.findOne({username})
       if(!user) return res.status(404).json({username:'Incorrect Username or Password'})
       const passwordMatch = await bcrypt.compare(password,user.password)
       if(!passwordMatch){
           return res.status(401).json({username:'Incorrect Username or Password'})
       }
       const token= jwt.sign({username},process.env.JWT_SECRET!)
       res.set('Set-Cookie', cookie.serialize('token',token,{
        httpOnly:true,
        secure: false,
        sameSite:'strict',
        path: '/'
       }))
       return res.json(token);
    } catch (error) {
        console.log(error)
        return res.status(500).json({errors: "Something went Wrong"})
    }
}

const me=(req:Request, res: Response) => {
    return res.json(res.locals.user)
}

const logout =async (req:Request,res: Response) => {
    res.set('Set-Cookie',cookie.serialize('token','',{
        httpOnly:true,
        secure: false,
        sameSite:'strict',
        expires: new Date(0),
        path: '/'
    }))
    return res.status(200).json({success: true})
}

const router = Router()
router.post('/register',register)
router.post('/login',login)
router.get('/me',auth,me)
router.get('/logout',auth,logout)
export default router
