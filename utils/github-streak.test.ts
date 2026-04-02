import { calculateStreak } from './github-streak'

const day = (offset: number): string => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    d.setDate(d.getDate() + offset)
    const pad = (n: number) => String(n).padStart(2, '0')
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

describe('calculateStreak', () => {
    it('returns zeros for empty contributions', () => {
        expect(calculateStreak([])).toStrictEqual({ currentStreak: 0, longestStreak: 0, totalContributions: 0 })
    })

    it('counts a current streak ending today', () => {
        const contribs = [
            { date: day(0), count: 3, level: 2 as const },
            { date: day(-1), count: 2, level: 1 as const },
            { date: day(-2), count: 5, level: 3 as const }
        ]
        const result = calculateStreak(contribs)
        expect(result.currentStreak).toBe(3)
    })

    it('counts a current streak ending yesterday when today is empty', () => {
        const contribs = [
            { date: day(-1), count: 4, level: 2 as const },
            { date: day(-2), count: 1, level: 1 as const }
        ]
        const result = calculateStreak(contribs)
        expect(result.currentStreak).toBe(2)
    })

    it('returns 0 current streak when last contribution was 2+ days ago', () => {
        const contribs = [{ date: day(-3), count: 5, level: 2 as const }]
        const result = calculateStreak(contribs)
        expect(result.currentStreak).toBe(0)
    })

    it('calculates longest streak correctly across a gap', () => {
        const contribs = [
            { date: day(-10), count: 1, level: 1 as const },
            { date: day(-9), count: 2, level: 1 as const },
            { date: day(-8), count: 3, level: 2 as const },
            // gap on day -7
            { date: day(-6), count: 1, level: 1 as const },
            { date: day(-5), count: 1, level: 1 as const }
        ]
        const result = calculateStreak(contribs)
        expect(result.longestStreak).toBe(3)
    })

    it('sums totalContributions correctly', () => {
        const contribs = [
            { date: day(-2), count: 4, level: 2 as const },
            { date: day(-1), count: 6, level: 3 as const },
            { date: day(0), count: 2, level: 1 as const }
        ]
        expect(calculateStreak(contribs).totalContributions).toBe(12)
    })
})
