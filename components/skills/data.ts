import { IconTypes } from '@/components/icon/types'

export type SkillItemType = {
    name: string
    level: number
    icon?: IconTypes[]
}

export const data: SkillItemType[] = [
    {
        icon: ['javascript', 'jquery'],
        level: 84,
        name: 'Vanilla JavaScript and jQuery'
    },
    {
        icon: ['typescript'],
        level: 82,
        name: 'TypeScript'
    },
    {
        icon: ['reactjs', 'nextjs', 'vuejs'],
        level: 91,
        name: 'ReactJS, NextJS and Vue'
    },
    {
        icon: ['redux'],
        level: 86,
        name: 'Redux and Redux Toolkit'
    },
    {
        icon: ['nodejs', 'webpack'],
        level: 50,
        name: 'NodeJS and Webpack'
    },
    {
        icon: ['npm', 'yarn'],
        level: 70,
        name: 'NPM and Yarn'
    },
    {
        icon: ['html', 'css'],
        level: 95,
        name: 'HTML, CSS (Sass and Less)'
    },
    {
        icon: ['git', 'gitlab', 'github'],
        level: 86,
        name: 'Git, Gitlab and Github'
    },
    {
        icon: ['playwright', 'jest', 'rtl'],
        level: 69,
        name: 'Playwright, Jest and RTL'
    },
    {
        icon: ['eslint', 'prettier'],
        level: 79,
        name: 'ESLint and Prettier'
    },
    {
        icon: ['php', 'python'],
        level: 51,
        name: 'PHP and Python'
    },
    {
        icon: ['laravel', 'codeigniter', 'yii'],
        level: 47,
        name: 'Laravel, Codeigniter and Yii'
    },
    {
        icon: ['postgresql', 'mysql', 'sqlite'],
        level: 58,
        name: 'PostgreSQL, MySQL and SQLite'
    },
    {
        icon: ['docker'],
        level: 63,
        name: 'Docker'
    }
]
