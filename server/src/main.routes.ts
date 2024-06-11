import { Router } from 'express'
import authRouter from './auth/auth.routes'
import messageRouter from './messages/msg.routes'
import projectsRouter from './projects/projects.routes'
import citiesRouter from './cities/city.routes'


const mainRouter: Router = Router()

mainRouter.use('/auth', authRouter)
mainRouter.use('/messages', messageRouter)
mainRouter.use('/main', projectsRouter)
mainRouter.use('/cities', citiesRouter)

export default mainRouter