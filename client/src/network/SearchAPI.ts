import { post, put, del, get } from './common/http'
import Page from '../types/Page'

async function search(query: string, onSuccess: (arg0: Page[]) => void, onError: (arg0: string) => void) {
    console.log(`/search/${encodeURIComponent(query)}`)
    get(`/search/${encodeURIComponent(query)}`, onSuccess, onError)
}

const Search = {
    search
}

export default Search