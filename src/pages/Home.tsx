import PageCard from '../components/PageCard'
import { Row } from '../components/common/Layout'

const posts = [1,1,1,1,1,1,1,1,1,1]

export default function Home() {
	return (
		<>
			<h1>Pinned</h1>
			<Row style={{flexWrap: 'wrap', padding: 0}}>
				{posts.map(() => <PageCard key={Math.random()} page={{title: 'Hello', description: 'Helloo there!', id: 1}}/>)}
			</Row>
		</>
	)
}
