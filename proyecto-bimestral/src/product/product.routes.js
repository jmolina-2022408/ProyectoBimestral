'use strict'

import { Router } from 'express'
import { save, get, update, deleteP, search } from './product.controller.js'

const api = Router()

api.post('/save', save)
api.get('/get', get)
api.post('/search', search)
api.put('/update/:id', update)
api.delete('/delete/:id', deleteP)

export default api