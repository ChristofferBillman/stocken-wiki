export default interface InfoSection {
    meta: InfoSectionMetaData
    data: InfoSectionStatistic[]
}

export interface InfoSectionMetaData {
    author: string
}
export interface InfoSectionStatistic {
    key: string
    value: string
}