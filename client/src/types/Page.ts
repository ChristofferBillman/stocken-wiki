import InfoSection from './InfoSection'

export default interface IPage {
    _id?: string
    content: string
    infoSection: InfoSection
    authors: string[]
}