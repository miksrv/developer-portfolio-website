import { IconTypes } from '@/components/icon/types'

type ExternalLinkType = {
    link: string
    label: string
    icon: IconTypes
}

const data: ExternalLinkType[] = [
    {
        icon: 'telegram',
        label: 'Telegram',
        link: 'https://t.me/miksoft'
    },
    {
        icon: 'pikabu',
        label: 'Pikabu',
        link: 'https://pikabu.ru/@miksoft'
    },
    {
        icon: 'github',
        label: 'GitHub',
        link: 'https://github.com/miksrv'
    },
    {
        icon: 'instagram',
        label: 'Instagram',
        link: 'https://instagram.com/miksoft.pro'
    },
    {
        icon: 'facebook',
        label: 'Facebook',
        link: 'https://facebook.com/miksoft.pro'
    },
    {
        icon: 'linkedin',
        label: 'LinkedIn',
        link: 'https://www.linkedin.com/in/mikcatsvill/'
    },
    {
        icon: 'vkontakte',
        label: 'VKontakte',
        link: 'https://vk.com/miksoft'
    }
]

export default data
