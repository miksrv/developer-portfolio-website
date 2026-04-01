import { Contribution } from './github-fetch'

export interface StreakResult {
    currentStreak: number
    longestStreak: number
    totalContributions: number
}

export function calculateStreak(contributions: Contribution[]): StreakResult {
    if (!contributions.length) {
        return { currentStreak: 0, longestStreak: 0, totalContributions: 0 }
    }

    // Sort ascending by date
    const sorted = [...contributions].sort((a, b) => (a.date < b.date ? -1 : 1))

    const totalContributions = sorted.reduce((sum, c) => sum + c.count, 0)

    // Build a set of active dates (count > 0)
    const activeDates = new Set(sorted.filter((c) => c.count > 0).map((c) => c.date))

    // Current streak: count backwards from today
    let currentStreak = 0
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const pad = (n: number) => String(n).padStart(2, '0')
    const dateStr = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

    // Start from today; if today has no contributions, start from yesterday
    let cursor = new Date(today)
    if (!activeDates.has(dateStr(cursor))) {
        cursor.setDate(cursor.getDate() - 1)
    }

    while (activeDates.has(dateStr(cursor))) {
        currentStreak++
        cursor.setDate(cursor.getDate() - 1)
    }

    // Longest streak: iterate all sorted dates
    let longest = 0
    let run = 0
    let prevDate: Date | null = null

    for (const c of sorted) {
        if (c.count === 0) {
            run = 0
            prevDate = null
            continue
        }
        const d = new Date(c.date + 'T00:00:00')
        if (prevDate === null) {
            run = 1
        } else {
            const diff = (d.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
            run = diff === 1 ? run + 1 : 1
        }
        if (run > longest) longest = run
        prevDate = d
    }

    return { currentStreak, longestStreak: longest, totalContributions }
}
