import { Row } from "../common/Layout"
import style from './SearchBar.module.css'

interface Props{
    title: string
    description?: string
    id: string
}

export function SearchResult(props: Props){
    return (
        <a href={`/page/${props.id}`}>
            <Row id={style.searchResult}>
                <h4>{props.title}</h4>
            </Row>
        </a>
    )
}