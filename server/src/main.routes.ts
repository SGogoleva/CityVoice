import { Router } from 'express'
import authRouter from './auth/auth.routes'
import messageRouter from './messages/msg.routes'
import projectsRouter from './projects/projects.routes'
import citiesRouter from './cities/city.routes'
import authoritiesRouter from './authorities/authorities.routes'
import usersouter from './users/users.routes'


const mainRouter: Router = Router()

mainRouter.use('/auth', authRouter)
mainRouter.use('/messages', messageRouter)
mainRouter.use('/main', projectsRouter)
mainRouter.use('/cities', citiesRouter)
mainRouter.use('/authorities', authoritiesRouter)
mainRouter.use('/users', usersouter)

export default mainRouter