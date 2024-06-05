import { Router } from 'express'
import authRouter from './auth/auth.routes'
import messageRouter from './messages/msg.routes'
import projectsRouter from './projects/projects.routes'


const mainRouter: Router = Router()

mainRouter.use('/auth', authRouter)
mainRouter.use('/messages', messageRouter)
mainRouter.use('/main', projectsRouter)


export default mainRouter