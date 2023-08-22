export default interface InfoSection {
    Title: string
    Description: string
    fields: InfoSectionField[]
}

export interface InfoSectionField {
    key: string
    value: string
}