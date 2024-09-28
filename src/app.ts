// import package
import express, { Request, Response } from 'express'
import cors from 'cors'

const app = express()
//middleware
app.use(cors())
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('The server is connect successfully')
})

export default app
