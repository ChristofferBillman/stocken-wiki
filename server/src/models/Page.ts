import mongoose, { Schema, Document } from 'mongoose'

export interface InfoSectionStatistic {
    key: string
    value: string
}

export interface InfoSection {
    data: InfoSectionStatistic[]
}
export interface IPage extends Document {
    content: string
    infoSection: InfoSection
    authors: string[]
}

const pageSchema: Schema<IPage> = new Schema({
    content: { type: String, required: true },
    infoSection: { type: Object, required: true },
    authors: [{ type: String, required: true }]
});

export default mongoose.model<IPage>('Page', pageSchema)