import InfoSection from './InfoSection'

export interface PageMetadata {
    history: Edit[]
}

export interface Edit {
    userId: string
    time: number
}
export default interface IPage {
    _id?: string
    content: string
    infoSection: InfoSection
    meta: PageMetadata
}