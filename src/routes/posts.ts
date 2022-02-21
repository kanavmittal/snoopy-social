import { Request, response, Response, Router } from "express";
import { Comments } from "../entity/Comments";
import { Post } from "../entity/Post";
import { Subs } from "../entity/Subs";
import auth from '../middleware/auth'

const CreatePost = async (req: Request, res:Response) => {
    const {title, body, sub }= req.body
    const user= res.locals.user
    if(title.trim()===''){
        return res.status(400).json({title: 'Title must not be empty'})
    }
    try {
        const subs = await Subs.findOneOrFail({name: sub})
        const post = new Post({title, body, user, sub:subs})
        await post.save()
        return res.json(post) 
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:'Something went wrong'})
    }
}

const getPosts = async (req:Request, res: Response)=>{
    try {
        const posts= await Post.find({relations:['comments','vote'],
            order: {createAt: "DESC"}})
        return res.json(posts)
    } catch (error) {
       console.log(error)
       return res.json("Something went wrong") 
    }
}
const getPost = async (req:Request, res: Response)=>{
    const {identifier , slug}= req.params
    try {
        const posts= await Post.find({identifier, slug})
        return res.json(posts)
    } catch (error) {
       console.log(error)
       return res.json("Post Not Found") 
    }
}
const commentOnPost=async (req:Request, res: Response) => {
    const {identifier, slug}=req.params
    const body= req.body.body
    try {
       const post = await Post.findOneOrFail({identifier, slug})
       const comment = new Comments({
        body,
        user: res.locals.user,
        post
       })
       await comment.save()
       return res.json(comment)
    } catch (error) {
       console.log(error)
       return res.status(404).json({error:'Post not Found'})
    }
}
const router = Router()
router.post('/', auth, CreatePost)
router.get('/', getPosts)
router.get('/:identifier/:slug',getPost)
router.post('/:identifier/:slug/comments',auth,commentOnPost)
export default router