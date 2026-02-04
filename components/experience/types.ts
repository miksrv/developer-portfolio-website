export type ExperienceType = {
    period: string[]
    role: string
    duties: string
    skills?: RoleSkillsType[]
}

type RoleSkillsType = {
    area: string
    stack: string[]
}
