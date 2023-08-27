export default interface InfoSection {
    data: InfoSectionStatistic[]
}
export interface InfoSectionStatistic {
    type: 'image' | 'text' | 'link'
    key: string
    value: string
    id: string
}