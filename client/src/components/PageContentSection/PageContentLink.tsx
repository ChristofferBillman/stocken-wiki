import { Link } from 'react-router-dom'

export default function PageContentLink({href, children}: any) {
	// If it is an external link, just put an href that navigates away.
	if(children[0].includes('http://') || children[0].includes('https://')) return (
		<a href={href}>{children}</a>
	)
	// If it is an internal link, hook it into react router.
	return (
		<Link to={href}>
			{children}
		</Link>
	)
}