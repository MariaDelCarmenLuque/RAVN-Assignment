import dotenv from 'dotenv'
dotenv.config()
import express, {Request,Response} from 'express'
import cors from 'cors'
import { router } from './router'

const app = express()
const PORT = process.env.PORT || 3000
const ENVIROMENT = process.env.NODE_ENV || 'development'
app.set('port',process.env.PORT || 3000) 


app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.get('/api/v1/status', (req: Request, res: Response) => {
    res.json({ time: new Date() })
  })
app.use('/', router(app))
app.listen(PORT,async () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port %d, env: %s`, PORT, ENVIROMENT)
  })
