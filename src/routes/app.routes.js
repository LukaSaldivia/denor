import { Router } from 'express'
import homeRoutes from './home.routes.js'
import loginRoutes from './login.routes.js'

const router = new Router()

router.use('/',loginRoutes)
router.use('/home',homeRoutes)

export default router