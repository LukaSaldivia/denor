import { Router } from 'express'
import model from '../models/producto.model.js'

const router = Router()

router.get('/', async(req, res) => {
  res.send(await model.search())
})

export default router