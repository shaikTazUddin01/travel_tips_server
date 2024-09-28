// import package
import express, { Request, Response } from 'express'
import cors from 'cors'
import router from './app/router'

const app = express()
//middleware
app.use(cors())
app.use(express.json())


//router
app.use('/api/v1',router)

app.get('/', (req: Request, res: Response) => {
  res.send('The server is connect successfully')
})

export default app
