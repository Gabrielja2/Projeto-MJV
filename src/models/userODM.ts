import AbstractODM from './AbstractODM'
import { type IUser } from '../interfaces/user.interface'
import { Schema } from 'mongoose'
import { hash } from 'bcrypt'
import moment from 'moment-timezone'

class UserODM extends AbstractODM<IUser> {
  constructor() {
    const schema = new Schema({
      email: { type: String, required: true },
      password: { type: String, required: true },
      username: { type: String, required: true },
      role: { type: String, required: true },
      created_at: {
        type: String,
        default: moment().tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm:ss')
      },
      updated_at: {
        type: String,
        default: moment().tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm:ss')
      }
    }, { versionKey: false })

    schema.pre('save', async function (next) {
      if (!this.isModified('password')) { next(); return }

      const hashedPassword = await hash(this.password, 10)
      this.password = hashedPassword
      next()
    })

    super(schema, 'User')
  }

  public async insertUser(user: IUser): Promise<IUser> {
    const newUser = await this.model.create(user)
    return newUser
  }

  public async countUsers(): Promise<number> {
    const count = await this.model.countDocuments()
    return count
  }
}

export default UserODM
