import express from 'express'
import { validateJwt } from '../middlewares/validate-jwt.js';
import { createPost, deletePost, editPost, test } from './posts.controller.js';

const api = express.Router();


api.get('/test', [validateJwt], test)
api.post('/createP', [validateJwt], createPost) 
api.put('/editP/:id', [validateJwt], editPost)
api.delete('/deleteP/:id', [validateJwt], deletePost)

export default api