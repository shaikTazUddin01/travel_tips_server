import { model, Schema } from 'mongoose'
import { IUSER } from './user.interface'


const userSchema = new Schema<IUSER>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  gender: { type:String, enum: ['Male', 'Female', 'Other'], required: true },
  role: { type:String, enum: ['USER','ADMIN'], required: true },
  phoneNumber: { type: String, required: true },
})

export const User = model<IUSER>('User', userSchema)
