import { Router } from 'express'
import authRouter from './auth/auth.routes'
import regUserRouter from './registration/reg.routes'
import messageRouter from './messages/msg.routes'


const mainRouter: Router = Router()

mainRouter.use('/auth', authRouter)
mainRouter.use('/messages', messageRouter)


export default mainRouter