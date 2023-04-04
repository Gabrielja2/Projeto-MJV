import mongoose, { type Mongoose } from 'mongoose'
import 'dotenv/config'

const MONGO_DB_URL = 'mongodb://localhost:27017/mjv-project'

const connectToDatabase = async (
  mongoDatabaseURI = process.env.MONGO_URL ? process.env.MONGO_URL : MONGO_DB_URL
): Promise<Mongoose> => await mongoose.connect(mongoDatabaseURI)

export default connectToDatabase
