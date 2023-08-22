import mongoose, { connect } from 'mongoose'

const CONNSTRING = 'mongodb://localhost:27017/stockenwiki'

export default async function GetDatabaseConnection() {
    if (!mongoose.connection.readyState) {
        await connect(CONNSTRING)
    }
    return mongoose.connection
}
