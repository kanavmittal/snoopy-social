import {BeforeInsert, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import { makeid, slugify } from "../util/helpers";
import bEntity from "./Entity";
import { Post } from "./Post";
import User from "./User";

@Entity('subs')
export class Subs extends bEntity {
    constructor(sub: Partial<Subs>){
        super()
        Object.assign(this,sub)
    }
    @Index()
    @Column({unique:true})
    name: string

    @Column()
    title: string

    @Column({type:'text',nullable:true})
    description: string

    @Column({nullable:true})
    imageUrl: string

    @Column({nullable: true})
    bannerUrl: string

    @ManyToOne(()=> User)
    @JoinColumn({name:'username',referencedColumnName:'username'})
    user: User

    @OneToMany(()=> Post, post => post.sub)
    posts: Post[]
}
