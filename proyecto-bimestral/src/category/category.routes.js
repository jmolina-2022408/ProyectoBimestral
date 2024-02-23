'use strict'

import { Router } from 'express'
import { save, get, update, deleteC, search } from './category.controller.js'

const api = Router()

api.post('/save', save)
api.get('/get', get)
api.post('/search', search)
api.put('/update/:id', update)
api.delete('/delete/:id', deleteC)

export default api