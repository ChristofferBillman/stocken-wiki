import {useRef, useState} from 'react'

import Input from '../common/Input'
import SearchAPI from '../../network/SearchAPI'
import useToast from '../../contexts/ToastContext'
import Page from '../../types/Page'

import style from './SearchBar.module.css'
import {Row} from '../common/Layout'
import useOutsideClick from '../../hooks/useOutsideClick'
import {SearchResult} from './SearchResult'
import { useNavigate } from 'react-router-dom'

export function SearchBar() {

	const [searchQuery, setSearchQuery] = useState('')
	const [searchResults, setSearchResults] = useState<Page[]>([])

	const [searchIsFocused, setSearchIsFocused] = useState(false)

	const visibilityStyle = (searchResults.length > 0 && searchIsFocused) ? 'visible' : 'hidden'

	const toast = useToast()
	const navigate = useNavigate()

	const ref = useRef(null)
	useOutsideClick(ref, () => {
		setSearchIsFocused(false)
	})

	const search = (str: string) => {
		const query = str.trim()
		if (query.length > 0) {
			SearchAPI.search(query, pages => {
				setSearchResults(pages)
			}
			, err => toast(err, 'error'))
		} else {
			setSearchResults([])
		}
	}

	return (
		<>
			<div id={style.searchTint} style={{visibility: visibilityStyle}}/>
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

				<div id={style.searchResults} style={{visibility: visibilityStyle}}>
					<p
						className={style.descriptionText}
						style={{margin: '1rem 0 0 1rem'}}
					>
						{searchResults.length} Results
					</p>
					{searchResults.map(page => (
						<div
							onClick={() => {
								navigate(`/page/${page._id}`)
								setSearchIsFocused(false)
							}}
							key={page._id}
						>
							<SearchResult
								page={page}
							/>
						</div>)
					)}
				</div>

			</Row>


		</>
	)
}
