import { StaticImageData } from 'next/image'

export interface IProgress {
    value: number
}

export enum EIcons {
    telegram,
    vkontakte,
    github,
    gitlab,
    pikabu,
    linkedin,
    typescript,
    javascript,
    reactjs,
    redux,
    nextjs,
    nodejs,
    yarn,
    npm,
    webpack,
    vuejs,
    jquery,
    html,
    css,
    php,
    postgresql,
    mysql,
    sqlite,
    python,
    laravel,
    yii,
    codeigniter,
    git,
    playwright,
    jest,
    rtl,
    eslint,
    prettier,
    docker
}

export interface ISvgIcon {
    name: EIcons
}

export type THeaderLink = {
    url: string
    label: string
}

export type TProject = {
    link: string
    label: string
    image: StaticImageData
}

export type TSkill = {
    name: string
    level: number
    icon?: EIcons | EIcons[]
}

export type TSocialNetwork = {
    link: string
    label: string
    icon: EIcons
}
