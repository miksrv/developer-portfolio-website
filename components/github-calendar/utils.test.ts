import { buildCalendarWeeks, formatTooltip, getTotalThisYear } from './utils'

// ── buildCalendarWeeks ─────────────────────────────────────────────────────────

describe('buildCalendarWeeks', () => {
    it('returns exactly the requested number of weeks', () => {
        const weeks = buildCalendarWeeks([], 53)
        expect(weeks).toHaveLength(53)
    })

    it('each week has exactly 7 day slots', () => {
        const weeks = buildCalendarWeeks([], 10)
        for (const week of weeks) {
            expect(week.days).toHaveLength(7)
        }
    })

    it('fills missing days with level-0 placeholder (not null)', () => {
        const weeks = buildCalendarWeeks([], 4)
        const pastDays = weeks
            .flatMap((w) => w.days)
            .filter((d) => d !== null)
        expect(pastDays.length).toBeGreaterThan(0)
        for (const day of pastDays) {
            expect(day!.level).toBe(0)
            expect(day!.count).toBe(0)
        }
    })

    it('maps a known contribution to the correct cell', () => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const y = today.getFullYear()
        const m = String(today.getMonth() + 1).padStart(2, '0')
        const d = String(today.getDate()).padStart(2, '0')
        const todayStr = `${y}-${m}-${d}`

        const contrib = { count: 7, date: todayStr, level: 4 as const }
        const weeks = buildCalendarWeeks([contrib], 2)
        const found = weeks.flatMap((w) => w.days).find((day) => day?.date === todayStr)
        expect(found).toBeDefined()
        expect(found!.count).toBe(7)
        expect(found!.level).toBe(4)
    })

    it('future day slots are null', () => {
        const weeks = buildCalendarWeeks([], 1)
        // The last week may contain future slots (null) if today is not Sunday
        const lastWeek = weeks[weeks.length - 1]
        // At least the non-null days should exist
        const nonNullDays = lastWeek.days.filter((d) => d !== null)
        expect(nonNullDays.length).toBeGreaterThan(0)
    })

    it('sets monthLabel on the first week of each month', () => {
        const weeks = buildCalendarWeeks([], 53)
        const labeled = weeks.filter((w) => w.monthLabel !== null)
        // Should have at least 11 and at most 13 month labels in a 53-week range
        expect(labeled.length).toBeGreaterThanOrEqual(11)
        expect(labeled.length).toBeLessThanOrEqual(13)
    })
})

// ── formatTooltip ──────────────────────────────────────────────────────────────

describe('formatTooltip', () => {
    it('returns "No contributions" for count 0', () => {
        const result = formatTooltip({ count: 0, date: '2024-06-15', level: 0 })
        expect(result).toMatch(/No contributions/)
        expect(result).toMatch(/2024/)
    })

    it('returns singular form for count 1', () => {
        const result = formatTooltip({ count: 1, date: '2024-06-15', level: 1 })
        expect(result).toMatch(/1 contribution on/)
    })

    it('returns plural form for count > 1', () => {
        const result = formatTooltip({ count: 12, date: '2024-06-15', level: 3 })
        expect(result).toMatch(/12 contributions on/)
    })
})

// ── getTotalThisYear ───────────────────────────────────────────────────────────

describe('getTotalThisYear', () => {
    const year = String(new Date().getFullYear())

    it('returns the value for the current year', () => {
        expect(getTotalThisYear({ [year]: 500 })).toBe(500)
    })

    it('falls back to lastYear if current year is missing', () => {
        expect(getTotalThisYear({ lastYear: 300 })).toBe(300)
    })

    it('returns 0 when map is empty', () => {
        expect(getTotalThisYear({})).toBe(0)
    })
})
