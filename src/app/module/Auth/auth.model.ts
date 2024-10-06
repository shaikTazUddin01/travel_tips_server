import { model, Schema } from 'mongoose'
import { IAuth } from './auth.interface'

const authSchmema = new Schema<IAuth>({
  
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

// export const Auth = model<IAuth>('Auth', authSchmema)
