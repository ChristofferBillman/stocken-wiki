import InfoSection from './InfoSection'

export interface PageMetadata {
    history: Edit[]
}

export interface Edit {
    user: string
    time: number
}
export default interface IPage {
    id: number
    content: string
    infoSection: InfoSection
    meta: PageMetadata
}