'use strict'

import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import { config } from "dotenv"
import userRoutes from '../src/users/users.routes.js'
import postRoutes from '../src/posts/posts.routes.js'
import commentRoutes from '../src/comments/comments.routes.js'


const app = express()
config()
const port = process.env.PORT || 3056


app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors()) 
app.use(helmet()) 
app.use(morgan('dev')) 


app.use(userRoutes)
app.use('/post', postRoutes)
app.use('/comment', commentRoutes)


export const initServer = () => {
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)
}