import { model, Schema } from 'mongoose'
import { IAuth } from './auth.interface'

const authSchmema = new Schema<IAuth>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  gender: { type:String, enum: ['Male', 'Female', 'Other'], required: true },
  phoneNumber: { type: String, required: true },
})

export const Auth = model<IAuth>('Auth', authSchmema)
