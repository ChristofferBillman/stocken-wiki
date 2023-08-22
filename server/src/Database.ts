import mongoose, { connect } from 'mongoose'

const CONNSTRING = 'mongodb://127.0.0.1:27017/stockenwiki'

export default async function GetDatabaseConnection() {
    if (!mongoose.connection.readyState) {
        await connect(CONNSTRING)
    }
    return mongoose.connection
}
