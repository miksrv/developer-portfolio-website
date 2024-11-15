import dayjs from 'dayjs'

import { formatDate, formatPeriod } from './date'

const testCases = [
    { dates: ['01/01/2020', '01/01/2022'], expected: '2 yrs' },
    { dates: ['01/01/2022', '01/01/2020'], expected: '' },
    { dates: ['01/01/2022', '06/01/2022'], expected: '5 mos' },
    { dates: ['01/01/2021', '01/01/2022'], expected: '1 yr' },
    { dates: ['01/01/2021', '06/01/2022'], expected: '1 yr 5 mos' }
]

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
    testCases.forEach(({ dates, expected }) => {
        it(`should format period correctly for dates ${dates}`, () => {
            const formattedPeriod = formatPeriod(dates)
            expect(formattedPeriod).toBe(expected)
        })
    })
})
