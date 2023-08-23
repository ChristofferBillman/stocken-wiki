export const getTimeSince = (lastEdit: number): string => {
	const date = new Date(lastEdit)
	const now = new Date()

	const diffInMs = now.getTime() - date.getTime()

	const seconds = Math.round(diffInMs / 1000)
	const minutes = Math.round(diffInMs / (1000 * 60))
	const hours = Math.round(diffInMs / (1000 * 60 * 60))

	if (seconds < 60) {
		return `${seconds} seconds ago`
	}
	if (minutes < 60) {
		return `about ${minutes} min ago`
	}
	if (hours < 24) {
		return `about ${hours} hours ago`
	}
	return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
}