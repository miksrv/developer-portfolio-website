import { ExperienceType } from '@/components/experience/types'

export const findEarliestDate = (experience: ExperienceType[]): string | undefined => {
    const allDates = experience
        .flatMap((exp) => exp.period)
        .map((dateStr) => new Date(dateStr))
        .filter((date) => !isNaN(date.getTime()))

    if (allDates.length === 0) {
        return undefined
    }

    const earliestDate = new Date(Math.min(...allDates.map((date) => date.getTime())))

    return earliestDate.toISOString().split('T')[0]
}
