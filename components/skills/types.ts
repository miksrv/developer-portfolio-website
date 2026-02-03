export type SkillItemType = {
    name: string
    level: number
}

export type SkillGroupType = {
    group: string
    skills: SkillItemType[]
}
