import { useRef, useState } from 'react'

import Input from '../common/Input'
import SearchAPI from '../../network/SearchAPI'
import useToast from '../../contexts/ToastContext'
import Page from '../../types/Page'

import style from './SearchBar.module.css'
import Button from '../common/Button'
import { Search } from '../../assets/Icons'
import { Row } from '../common/Layout'
import useOutsideClick from '../../hooks/useOutsideClick'
import { SearchResult } from './SearchResult'

export function SearchBar() {

	const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState<Page[]>([])

    const [searchIsFocused, setSearchIsFocused] = useState(false)

    const visibilityStyle = (searchResults.length > 0 && searchIsFocused) ? 'visible' : 'hidden'

	const toast = useToast()
    
    const ref = useRef(null);
    useOutsideClick(ref, () => {
        setSearchIsFocused(false)
    });

	const search = (str: string) => {
		let query = str.trim()
		if (query.length > 0) {
			SearchAPI.search(query, pages => {
				setSearchResults(pages)
			}
			, err => toast(err, 'error'));
	} else {
        setSearchResults([])
    }
}

	return (
        <>
            <div id={style.searchTint}  style={{visibility: visibilityStyle}} />
            <Row id={style.searchContainer} forwardRef={ref}>
                <Input 
                    onFocus={() => setSearchIsFocused(true)}
                    placeholder='Search Everything'
                    style={{width: '500px'}}
                    value={searchQuery}
                    name='Search'
                    setValue={e => {
                        setSearchQuery(e.target.value)
                        search(e.target.value)
                    }}
                />
                <Button outline icon={<Search color='var(--primary)'/>} />
                
                <div id={style.searchResults} style={{visibility: visibilityStyle}}>
                    {searchResults.map(page => {
                        
                        // Get title by removing any leading # and and cut at the new line
                        let title = page.content.replace(/^#+\s/, '').split('\n')[0]
                        
                        return (
                            <SearchResult
                                key={page._id}
                                title={title}
                                id={page._id}
                            />
                        )
                    })}
                </div>

            </Row>
           

            
        </>		
	)
}
