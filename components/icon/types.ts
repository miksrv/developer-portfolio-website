export const iconNames = {
    telegram: 'telegram',
    github: 'github',
    linkedin: 'linkedin',
    web: 'web',
    facebook: 'facebook',
    left: 'left',
    right: 'right'
} as const

export type IconTypes = keyof typeof iconNames
