import { BeforeInsert, Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import bEntity from "./Entity";
import { Post } from "./Post";
import User from "./User";
import { makeid } from "../util/helpers";
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

    @BeforeInsert()
    makeId(){
        this.identifier=makeid(8)
    }
}