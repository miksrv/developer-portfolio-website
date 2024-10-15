import dayjs from 'dayjs'

export const formatDate = (date: string, format?: string): string => dayjs(date).format(format ?? 'DD/MM/YYYY')

export const formatPeriod = (dates: string[]): string => {
    const [start, end] = dates

    const startDate = dayjs(start, 'MM/DD/YYYY')
    const endDate = end ? dayjs(end, 'MM/DD/YYYY') : dayjs(new Date())

    if (startDate.isAfter(endDate)) {
        return ''
    }

    const years = endDate.diff(startDate, 'year')
    const months = endDate.diff(startDate.add(years, 'year'), 'month')

    if (years === 0) {
        return `${months} mos`
    } else if (months === 0) {
        return `${years} yr${years > 1 ? 's' : ''}`
    }

    return `${years} yr${years > 1 ? 's' : ''} ${months} mo${months > 1 ? 's' : ''}`
}
