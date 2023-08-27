import mongoose, { Schema, Document } from 'mongoose'
import {IPage} from "./Page";

export interface IPageRecord extends Document {
    page: IPage
    versionNumber: number
    time: number
    author: string
}

const pageRecordSchema: Schema<IPageRecord> = new Schema({
    page: { type: Object, required: true },
    versionNumber: {type: Number, required: true},
    time: {type: Number, required: true},
    author: {type: String, required: true},
})

export default mongoose.model<IPageRecord>('PageRecord', pageRecordSchema)