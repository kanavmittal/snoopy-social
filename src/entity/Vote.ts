import {Entity, Column, Index, BeforeInsert, OneToMany, ManyToOne, JoinColumn} from "typeorm";
import { Comments } from "./Comments";
import bEntity from './Entity'
import { Post } from "./Post";
import User from "./User";
@Entity('votes')
export default  class Vote extends bEntity{
    constructor(vote: Partial<Vote>){
        super()
        Object.assign(this,vote)
    }
    @Column()
    value: number

    @ManyToOne(()=> User)
    @JoinColumn({name:'username',referencedColumnName:'username'})
    user:User


    @Column()
    username: string

    @ManyToOne(()=>Comments)
    comment:Comments

    @ManyToOne(()=>Post)
    post:Post

       
}
