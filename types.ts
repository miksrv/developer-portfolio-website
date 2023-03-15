import { StaticImageData } from 'next/image'

export interface IProgress {
    value: number
}

export enum EIcons {
    telegram,
    vkontakte,
    github,
    pikabu,
    linkedin
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
}

export type TSocialNetwork = {
    link: string
    label: string
    icon: EIcons
}
