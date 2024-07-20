import { format, formatDistanceToNow, fromUnixTime, isToday, isYesterday, isThisYear, parseISO } from "date-fns"
import { enUS } from "date-fns/locale"

export const getRelativeTime = (timestamp: number) => {
	const date = fromUnixTime(timestamp / 1000)
	return formatDistanceToNow(date, { addSuffix: true, locale: enUS })
}

export const formatDate = (dateString: string | undefined) => {
	// typeof' check is always false: 'dateString' always has type 'string'
	if (!dateString) {
		return 'Invalid date'
	}
	try {
		const date = parseISO(dateString)

		if (isToday(date)) {
			return 'Today'
		} else if (isYesterday(date)) {
			return 'Yesterday'
		} else if (isThisYear(date)) {
			return format(date, 'EEE MMM d', { locale: enUS })
		} else {
			return format(date, 'MMM d, yyyy', { locale: enUS })
		}
	} catch (error) {
		console.error('Error parsing date:', error)
		return 'Invalid date'
	}
}

// If you still need the full date format somewhere, you can keep this function
export const formatFullDate = (timestamp: number) => {
	const date = fromUnixTime(timestamp / 1000)
	return format(date, "EEEE, MMMM d yyyy 'at' h:mm a 'EST'", { locale: enUS })
}