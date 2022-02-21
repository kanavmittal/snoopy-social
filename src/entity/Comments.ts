import { BeforeInsert, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import bEntity from "./Entity";
import { Post } from "./Post";
import User from "./User";
import { makeid } from "../util/helpers";
import Vote from "./Vote";
@Entity('comments')
export class Comments extends bEntity{
    constructor(comment: Partial<Comments>){
        super()
        Object.assign(this, comment)
    }
    @Index()
    @Column()
    identifier: string

    @Column()
    body: string

    @Column()
    username: string

    @ManyToOne(()=> User)
    @JoinColumn({name: 'username',referencedColumnName:'username'})
    user:User

    @ManyToOne(()=> Post, post=> post.comments, {nullable:false})
    post: Post

    @OneToMany(()=>Vote, vote=>vote.comment)
    vote:Vote[]

    protected userVote: number
    setUserVote(user: User){
        const index= this.vote.findIndex((v)=>v.username==user.username)
        this.userVote = index > -1 ? this.vote[index].value : 0
    }
    
    @BeforeInsert()
    makeId(){
        this.identifier=makeid(8)
    }
}