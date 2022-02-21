import { Request, Response, Router } from "express";
import { Comments } from "../entity/Comments";
import { Post } from "../entity/Post";
import User from "../entity/User";
import Vote from "../entity/Vote";
import auth from "../middleware/auth";


const vote=async (req:Request,res: Response) => {
    const {identifier, slug, commentIdentifier, value}= req.body
    if(![-1,0,1].includes(value)){
        return res.status(400).json({value: 'invalid vote value, try using -1, 0 and 1'})
    }
    try {
       const user: User= res.locals.user 
       let post = await Post.findOneOrFail({identifier, slug})
       let vote:Vote | undefined
       let comment: Comments | undefined

        if(commentIdentifier){
            comment= await Comments.findOneOrFail({identifier: commentIdentifier})
            vote = await Vote.findOne({user,comment})
        }
        else{
            vote= await Vote.findOne({user, post})
        }
        if(!vote && value==0){
            return res.status(400).json({error: 'Vote Not found'})
        }
        else if(!vote){
            vote= new Vote({user, value})
            if(comment) vote.comment= comment 
            else vote.post= post
            await vote.save()
        }
        else if(value==0){
            await vote.remove()
        }
        else if(vote.value!==value){
            vote.value= value
            await vote.save()
        }
        post= await Post.findOneOrFail({identifier, slug}, {relations: ['comments','sub','comments.vote','vote']})
        post.setUserVote(user)
        post.comments.forEach((c)=>c.setUserVote(user))
        return res.json(post);
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'Someting Went Wrong'})
    }
}

const router = Router()
router.post('/vote',auth,vote)
export default router