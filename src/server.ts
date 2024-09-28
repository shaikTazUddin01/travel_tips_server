import app from './app'
import config from './app/config'
import mongoose from 'mongoose'

async function main() {
  try {
    await mongoose.connect(config.db_url as string)
    app.listen(config.port, () => {
      console.log(`The server running port is : ${config.port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

main()
