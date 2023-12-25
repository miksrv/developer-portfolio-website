import { TProject } from '@/types'

import imageAsteroid from '@/public/project-asteroid.jpg'
import imageGreen from '@/public/project-greenexp.jpg'
import imageMeteo from '@/public/project-meteostation.jpg'
import imageSpace from '@/public/project-nearspace.jpg'
import imageAstro from '@/public/project-observatory.jpg'
import imageOrenburzhie from '@/public/project-orenburzhie.jpg'
import imageOrion from '@/public/project-orion.jpg'
import imageRia from '@/public/project-ria56.jpg'

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
        image: imageAsteroid,
        label: 'Asteroids monitoring project',
        link: 'https://asteroid.miksoft.pro'
    },
    {
        image: imageOrion,
        label: 'Science projects',
        link: 'https://vk.com/astrorion'
    },
    {
        image: imageRia,
        label: 'Orenburg News Portal',
        link: 'https://ria56.ru'
    },
    {
        image: imageOrenburzhie,
        label: 'Orenburg News Portal',
        link: 'https://orenburzhie.ru'
    }
]
