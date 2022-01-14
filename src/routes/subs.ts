import { isEmpty } from "class-validator";
import { Request, Response, Router } from "express";
import User from "../entity/User";
import { getRepository } from "typeorm";
import { Subs } from "../entity/Subs";
import auth from "../middleware/auth";
const createSub = async (req: Request, res: Response)=>{
    const {name, title, description }= req.body
    const user: User= res.locals.user
    try {
        let error : any = {}
        if(isEmpty(name)){
            error.name="Name must not be empty"
        }
        if(isEmpty(title)) error.title="Title must not be empty"
        const sub = await getRepository(Subs).createQueryBuilder('sub').where('lower(sub.name) = :name',{name: name.toLowerCase()}).getOne()
        if(sub) error.name= "Sub exists already"
        if(Object.keys(error).length>0) throw error

         
    } catch (error) {
        console.log(error);
        return res.status(400).json(error)
    }
    try {
       const sub= new Subs({name, description, title, user}) 
       await sub.save()
       return res.json(sub)
    } catch (error) {
        console.log(error)  
        return res.status(500).json({error: "Soemething went wrong"})
    }
}
const router = Router()
router.post('/', auth, createSub)
export default router
