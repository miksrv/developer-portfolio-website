import type { Contribution } from '@/utils/github-fetch'

export interface CalendarWeek {
    days: (Contribution | null)[]
    monthLabel: string | null
}

/**
 * Returns "YYYY-MM-DD" in local time (avoids UTC offset issues with toISOString).
 */
function toLocalDateString(date: Date): string {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
}

/**
 * Builds an array of calendar weeks for the last `weeksCount` weeks ending today.
 * Row 0 = Monday, Row 6 = Sunday (ISO week, same as GitHub).
 */
export function buildCalendarWeeks(contributions: Contribution[], weeksCount: number): CalendarWeek[] {
    const map = new Map(contributions.map((c) => [c.date, c]))

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Align to Monday of the current week
    const dow = today.getDay() // 0=Sun
    const daysToMonday = dow === 0 ? 6 : dow - 1
    const thisMonday = new Date(today)
    thisMonday.setDate(today.getDate() - daysToMonday)

    // First Monday of the range
    const startMonday = new Date(thisMonday)
    startMonday.setDate(thisMonday.getDate() - (weeksCount - 1) * 7)

    const weeks: CalendarWeek[] = []
    let prevMonth = -1

    for (let w = 0; w < weeksCount; w++) {
        const days: (Contribution | null)[] = []
        let monthLabel: string | null = null

        for (let d = 0; d < 7; d++) {
            const date = new Date(startMonday.getTime() + (w * 7 + d) * 86_400_000)

            // Future days — render as transparent placeholder
            if (date > today) {
                days.push(null)
                continue
            }

            const dateStr = toLocalDateString(date)
            days.push(map.get(dateStr) ?? { count: 0, date: dateStr, level: 0 })

            // Month label on Monday (d=0) when the month changes
            if (d === 0 && date.getMonth() !== prevMonth) {
                monthLabel = date.toLocaleString('en-US', { month: 'short' })
                prevMonth = date.getMonth()
            }
        }

        weeks.push({ days, monthLabel })
    }

    return weeks
}

/**
 * Returns a human-readable tooltip string for a contribution cell.
 */
export function formatTooltip(contribution: Contribution): string {
    const date = new Date(contribution.date)
    const formatted = date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        weekday: 'short',
        year: 'numeric'
    })

    if (contribution.count === 0) return `No contributions on ${formatted}`
    if (contribution.count === 1) return `1 contribution on ${formatted}`
    return `${contribution.count} contributions on ${formatted}`
}

/**
 * Returns the total contributions for the current year from the totals map.
 */
export function getTotalThisYear(total: Record<string, number>): number {
    const year = String(new Date().getFullYear())
    return total[year] ?? total['lastYear'] ?? 0
}
