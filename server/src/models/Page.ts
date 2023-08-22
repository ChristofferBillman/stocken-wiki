import mongoose, { Schema, Document } from 'mongoose'

export interface InfoSectionStatistic {
    key: string
    value: string
}

export interface InfoSection {
    data: InfoSectionStatistic[]
}

export interface PageMetadata {
    history: Edit[]
}

export interface Edit {
    user: string
    time: number
}

export interface IPage extends Document {
    content: string
    infoSection: InfoSection
    meta: PageMetadata
}

const pageSchema: Schema<IPage> = new Schema({
    content: { type: String, required: true },
    infoSection: { type: Object, required: true },
    meta: { type: Object, required: true }
});

export default mongoose.model<IPage>('Page', pageSchema)