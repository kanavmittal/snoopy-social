import {Entity, Column, Index, BeforeInsert, OneToMany} from "typeorm";
import { IsEmail, Length, Min } from "class-validator";
import bcrypt from 'bcrypt'
import { Exclude } from "class-transformer";
import bEntity from './Entity'
import { Post } from "./Post";
@Entity('users')
export default  class User extends bEntity{
    constructor(user: Partial<User>){
        super()
        Object.assign(this,user)
    }
    
    @Index()
    @IsEmail(undefined,{message:"Must be a vaild Email"})
    @Length(1,255,{message:"Email is Empty"})
    @Column({unique: true})
    email: string

    @Index()
    @Length(3,255,{message:"must be atleast 3 character long"})
    @Column({unique: true})
    username: string

    @Column()
    @Length(6,255,{message:"Must be atleast 6 character long "})
    password: string

    @OneToMany(()=> Post, post=> post.user)
    posts: Post[]    
    @BeforeInsert()
   async hashPass() {
       this.password= await bcrypt.hash(this.password,6)
   }    
}
