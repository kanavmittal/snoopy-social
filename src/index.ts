import "reflect-metadata";
import {createConnection} from "typeorm";
import express from 'express'
import morgan from "morgan";
import trim from "./middleware/trim";
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import Cors from 'cors'
dotenv.config()

import authRoutes from './routes/auth'
import postRoutes from './routes/posts'
import subsRoutes from './routes/subs'
import utilsRoutes from './routes/Utils'
const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(trim)
app.use(cookieParser())
app.use(Cors({
    credentials:true,
    origin: "http://localhost:3000/",
    optionsSuccessStatus: 200,
}))
app.get('/',(req,res) => {
    res.send('Hello World');
})

app.use('/api/auth',authRoutes)
app.use('/api/post',postRoutes)
app.use('/api/subs',subsRoutes)
app.use('/api/utils',utilsRoutes)
app.listen(5001, async() => {
    console.log('Server running at port 5001')
    try {
        await createConnection()
        console.log("Database Connected")
    } catch (err) {
        console.log(err);
    }
})
