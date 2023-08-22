import mongoose, { Schema } from 'mongoose'

export interface IUser {
    password: string
    name: string
    _id: string
}

const userSchema: Schema = new Schema<IUser>({
    password: { type: String, required: true },
    name: { type: String, required: true },
})

export default mongoose.model('User', userSchema)