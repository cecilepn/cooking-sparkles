import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    const options = {}
    const conn = await mongoose.connect(process.env.MONGO_URI, options)

    console.log(`MongoDB running on : ${conn.connection.host}`)
    console.log(`Base name : ${conn.connection.name}`)

    return conn
  } catch (error) {
    console.error('Error connection to MongoDB :')
    console.error(error.message)
    process.exit(1)
  }
}

export const closeDB = async () => {
  try {
    await mongoose.connection.close()
    console.log('Connection MongoDB closed')
  } catch (error) {
    console.error('Error when try to shut down MongoDB :', error)
  }
}

// Handling events connection
mongoose.connection.on('error', err => {
  console.error('Error MongoDB :', err)
})

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB deconnected')
})

// Closing db event
process.on('SIGINT', async () => {
  await closeDB()
  process.exit(0)
})
