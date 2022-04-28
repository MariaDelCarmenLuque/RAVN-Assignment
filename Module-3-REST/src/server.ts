import dotenv from 'dotenv'
dotenv.config()
import express, {NextFunction, Request,Response} from 'express'
import cors, { CorsOptions } from 'cors'
import { router } from './router'
import { HttpError } from 'http-errors'

const app = express()
const PORT = process.env.PORT || 3000
const ENVIROMENT = process.env.NODE_ENV || 'development'
// app.set('port',process.env.PORT || 3000) 


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const whiteList = ['http://localhost:3000']
const corsOptionsDelegate = function handler(
  req: Request,
  callback: (err: Error | null, options?: CorsOptions) => void,
) {
  const corsOptions: { origin: boolean } = { origin: false }

  if (whiteList.indexOf(req.header('Origin') ?? '') !== -1) {
    corsOptions.origin = true
  }

  callback(null, corsOptions)
}

function errorHandler(
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (ENVIROMENT !== 'development') {
    console.error(err.message)
    console.error(err.stack || '')
  }

  res.status(err.status ?? 500)
  res.json(err)
}

app.use(cors(corsOptionsDelegate))
app.get('/api/v1/status', (req: Request, res: Response) => {
    res.json({ time: new Date() })
  })
app.use('/', router(app))
app.use(errorHandler)
app.listen(PORT,async () => {
    console.log(`Server listening on port %d, env: %s`, PORT, ENVIROMENT)
  })
