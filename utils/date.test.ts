import dayjs from 'dayjs'

import { formatDate, formatPeriod } from './date'

describe('formatDate', () => {
    it('should format date with default format', () => {
        const date = '2023-10-01'
        const formattedDate = formatDate(date)
        expect(formattedDate).toBe(dayjs(date).format('DD/MM/YYYY'))
    })

    it('should format date with provided format', () => {
        const date = '2023-10-01'
        const format = 'YYYY-MM-DD'
        const formattedDate = formatDate(date, format)
        expect(formattedDate).toBe(dayjs(date).format(format))
    })
})

describe('formatPeriod', () => {
    it('should format period correctly when end date is provided', () => {
        const dates = ['01/01/2020', '01/01/2022']
        const formattedPeriod = formatPeriod(dates)
        expect(formattedPeriod).toBe('2 yrs')
    })

    it('should return empty string if start date is after end date', () => {
        const dates = ['01/01/2022', '01/01/2020']
        const formattedPeriod = formatPeriod(dates)
        expect(formattedPeriod).toBe('')
    })

    it('should format period correctly when period is less than a year', () => {
        const dates = ['01/01/2022', '06/01/2022']
        const formattedPeriod = formatPeriod(dates)
        expect(formattedPeriod).toBe('5 mos')
    })

    it('should format period correctly when period is exactly one year', () => {
        const dates = ['01/01/2021', '01/01/2022']
        const formattedPeriod = formatPeriod(dates)
        expect(formattedPeriod).toBe('1 yr')
    })

    it('should format period correctly when period is more than a year but less than two years', () => {
        const dates = ['01/01/2021', '06/01/2022']
        const formattedPeriod = formatPeriod(dates)
        expect(formattedPeriod).toBe('1 yr 5 mos')
    })
})
