import mongoose, { type Mongoose } from 'mongoose'
import 'dotenv/config'
import UserODM from '../models/userODM'
import JuiceODM from '../models/juiceODM'
import { juices } from './juices.database'

const MONGO_DB_URL = 'mongodb://localhost:27017/mjv-project'

export const connectToDatabase = async (
  mongoDatabaseURI = process.env.MONGO_URL ? process.env.MONGO_URL : MONGO_DB_URL
): Promise<Mongoose> => await mongoose.connect(mongoDatabaseURI)

const userODM = new UserODM()
const juiceODM = new JuiceODM()

const init = async (): Promise<void> => {
  try {
    const [userCount, juiceCount] = await Promise.all([userODM.countUsers(), juiceODM.countJuices()])

    if (userCount === 0) {
      await userODM.insertUser({
        username: 'admin',
        email: 'admin@admin.com',
        password: 'Admin123',
        role: 'admin'
      })
      console.log('Documento de usuário inserido com sucesso!')
    }

    if (juiceCount === 0) {
      await juiceODM.insertMany(juices)
      console.log('Documentos de sucos inseridos com sucesso!')
    }
  } catch (err) {
    console.error(err)
  }
}

void init()
