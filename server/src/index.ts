import 'dotenv/config'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express, { Express } from 'express'
import { initMongodb } from '../src/providers/mongodb'
import mainRouter from './main.routes'
import env from './config';

initMongodb().catch((err) => {
  console.error(err)
})

const app: Express = express()

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true
};

app.use(cors(corsOptions));

app.use(cookieParser())
app.use(express.json())
app.get('/health', (req, res) => {
  res.send('server running')
})

app.use('/api/v1', mainRouter)

export default app