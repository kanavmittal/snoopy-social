import { Expose } from "class-transformer";
import {AfterLoad, BeforeInsert, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import { makeid, slugify } from "../util/helpers";
import { Comments } from "./Comments";
import bEntity from "./Entity";
import { Subs } from "./Subs";
import User from "./User";
import Vote from "./Vote";
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
    
    @Column()
    username: string
  
    @ManyToOne(()=> User, user => user.posts)
    @JoinColumn({name: 'username', referencedColumnName:'username'})
    user: User;

    @ManyToOne(()=> Subs, sub => sub.posts)
    @JoinColumn({name: 'subName', referencedColumnName:'name'})
    sub: Subs;

    @OneToMany(()=> Comments,comment=> comment.post)
    comments: Comments[]
    
    @OneToMany(()=>Vote,Vote=>Vote.post)
    vote:Vote[]

    @Expose() 
    get commentCount():number {
        if(this.comments){
            return this.comments.length;
        }else{
            return -1;
        }
    }

    @Expose() 
    get voteScore(): number {
        if(this.vote){
            return this.vote.reduce((prev,curr) => prev + (curr.value || 0), 0)
        }else{
            return 0;
        }
        
    }

    protected userVote: number
    setUserVote(user: User){
        const index= this.vote.findIndex((v)=>v.username==user.username)
        this.userVote = index > -1 ? this.vote[index].value : 0
    }
    @BeforeInsert()
    makeIdandSlug(){
        this.identifier = makeid(7)
        this.slug= slugify(this.title,"_")
    }
}
