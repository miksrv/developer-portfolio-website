import imageGeometki from '@/public/project-geometki.jpg'
import imageMeteo from '@/public/project-meteostation.jpg'
import imageSpace from '@/public/project-nearspace.jpg'
import imageAstro from '@/public/project-observatory.jpg'
import { TProject } from '@/types'

export const projects: TProject[] = [
    {
        image: imageGeometki,
        label: 'Interesting places and attractions',
        link: 'https://geometki.com/'
    },
    {
        image: imageAstro,
        label: 'Homemade observatory',
        link: 'https://astro.miksoft.pro/'
    },
    {
        image: imageMeteo,
        label: 'Amateur weather station',
        link: 'https://meteo.miksoft.pro/'
    },
    {
        image: imageSpace,
        label: 'Telegram Channel',
        link: 'https://t.me/+QpMO8yF37DRVPail'
    }
]
