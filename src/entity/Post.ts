import {BeforeInsert, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import { makeid, slugify } from "../util/helpers";
import { Comments } from "./Comments";
import bEntity from "./Entity";
import { Subs } from "./Subs";
import User from "./User";
@Entity()
export class Post extends bEntity {
    constructor(post: Partial<Post>){
        super()
        Object.assign(this,post)
    }
    @Index()
    @Column()
    identifier: string

    @Column()
    title : string

    @Column()
    slug: string

    @Column({nullable: true, type: 'text'})
    body: string
    
    @Column()
    subName: string
    
    @ManyToOne(()=> User, user => user.posts)
    @JoinColumn({name: 'username', referencedColumnName:'username'})
    user: User;

    @ManyToOne(()=> Subs, sub => sub.posts)
    @JoinColumn({name: 'subName', referencedColumnName:'name'})
    sub: Subs;

    @OneToMany(()=> Comments,comment=> comment.post)
    comments: Comments[]
    @BeforeInsert()
    makeIdandSlug(){
        this.identifier = makeid(7)
        this.slug= slugify(this.title,"_")
    }
}
