import { ExperienceType } from '@/components/experience/types'

import { findEarliestDate } from './utils'

const defaultExperience: ExperienceType = {
    period: ['2020-01-01', '2021-01-01'],
    role: 'Developer',
    duties: 'Developed applications',
    skills: []
}

describe('findEarliestDate', () => {
    it('returns undefined for empty array', () => {
        expect(findEarliestDate([])).toBeUndefined()
    })

    it('returns undefined if all dates are invalid', () => {
        const experience: ExperienceType[] = [
            {
                ...defaultExperience,
                period: ['invalid-date']
            }
        ]
        expect(findEarliestDate(experience)).toBeUndefined()
    })

    it('returns the earliest date for valid dates', () => {
        const experience = [
            { ...defaultExperience, period: ['2022-01-01', '2023-01-01'] },
            { ...defaultExperience, period: ['2021-05-05'] }
        ]
        expect(findEarliestDate(experience)).toBe('2021-05-05')
    })

    it('ignores invalid dates and finds the earliest valid date', () => {
        const experience = [
            { ...defaultExperience, period: ['invalid', '2022-01-01'] },
            { ...defaultExperience, period: ['2021-01-01'] }
        ]
        expect(findEarliestDate(experience)).toBe('2021-01-01')
    })

    it('handles single valid date', () => {
        const experience = [{ ...defaultExperience, period: ['2020-12-12'] }]
        expect(findEarliestDate(experience)).toBe('2020-12-12')
    })
})
