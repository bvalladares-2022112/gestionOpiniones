import express from 'express'
import { validateJwt } from '../middlewares/validate-jwt.js';
import { createComment, deleteComment, editComment, test } from './comments.controller.js';

const api = express.Router();


api.get('/test', [validateJwt], test)
api.post('/createC', [validateJwt], createComment) 
api.put('/editC/:id', [validateJwt], editComment)
api.delete('/deleteC/:id', [validateJwt], deleteComment)

export default api