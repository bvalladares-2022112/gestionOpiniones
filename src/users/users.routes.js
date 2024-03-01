import express from 'express'
import { validateJwt } from '../middlewares/validate-jwt.js';
import { test, register, login, editProfile } from './users.controller.js';

const api = express.Router();

api.post('/register', register)
api.post('/login', login)
api.get('/test', [validateJwt], test)
api.put('/editProfile/:id', [validateJwt], editProfile) 

export default api