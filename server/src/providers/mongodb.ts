import env from '../../config'
import mongoose from 'mongoose'

/**
 * Initialize MongoDB
 */
export async function initMongodb(): Promise<void> {
  mongoose.connection?.on('connected', () => {
    console.log('MongoDB connected')
  })

  mongoose.connection?.on('error', (error) => {
    console.error('MongoDB connection error:', error)
  })

  await mongoose.connect(env.MONGODB_URI, {
    dbName: env.MONGODB_DATABASE_NAME,
  })
}

/**
 * Disconnect from MongoDB
 */
export async function mongodbDisconnect(): Promise<void> {
  await mongoose.disconnect()
}
