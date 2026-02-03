type SkillItemType = {
    name: string
    level: number
}

export type SkillGroupType = {
    group: string
    skills: SkillItemType[]
}

export const data: SkillGroupType[] = [
    {
        group: 'Frontend',
        skills: [
            {
                name: 'TypeScript',
                level: 80
            },
            {
                name: 'React, Next.js',
                level: 90
            },
            {
                name: 'Redux',
                level: 86
            },
            {
                name: 'ESLint & Prettier',
                level: 79
            }
        ]
    },
    {
        group: 'Backend',
        skills: [
            {
                name: 'Node.js',
                level: 70
            },
            {
                name: 'PHP',
                level: 80
            },
            {
                name: 'Python',
                level: 50
            },
            {
                name: 'SQL',
                level: 60
            }
        ]
    },
    {
        group: 'Testing',
        skills: [
            {
                name: 'Playwright',
                level: 70
            },
            {
                name: 'Jest',
                level: 80
            },
            {
                name: 'RTL',
                level: 80
            }
        ]
    },
    {
        group: 'DevOps',
        skills: [
            {
                name: 'Docker',
                level: 60
            },
            {
                name: 'Git',
                level: 90
            },
            {
                name: 'Linux',
                level: 90
            }
        ]
    }
]
