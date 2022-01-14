import {PrimaryGeneratedColumn, Column, BaseEntity, Index, CreateDateColumn, UpdateDateColumn, BeforeInsert} from "typeorm";
import { IsEmail, Length, Min } from "class-validator";
import bcrypt from 'bcrypt'
import { classToPlain, Exclude} from 'class-transformer'
export default abstract class bEntity extends BaseEntity{
    @Exclude()
    @PrimaryGeneratedColumn()
    id: number;
    
    @CreateDateColumn()
    createAt: Date

    @UpdateDateColumn()
    updatedAt: Date

   toJSON() {
       return classToPlain(this)
   }
}
