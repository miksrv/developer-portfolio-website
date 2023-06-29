import { TProject } from '@/types'

import imageGreen from '@/public/project-greenexp.jpg'
import imageMeteo from '@/public/project-meteostation.jpg'
import imageSpace from '@/public/project-nearspace.jpg'
import imageAstro from '@/public/project-observatory.jpg'
import imageOrion from '@/public/project-orion.jpg'

export const projects: TProject[] = [
    {
        image: imageMeteo,
        label: 'Amateur weather station',
        link: 'https://meteo.miksoft.pro/'
    },
    {
        image: imageAstro,
        label: 'Homemade observatory',
        link: 'https://astro.miksoft.pro/'
    },
    {
        image: imageSpace,
        label: 'Telegram Channel',
        link: 'https://t.me/+QpMO8yF37DRVPail'
    },
    {
        image: imageGreen,
        label: 'Greenexp travel project',
        link: 'https://greenexp.ru'
    },
    {
        image: imageOrion,
        label: 'Science projects',
        link: 'https://vk.com/astrorion'
    }
]
