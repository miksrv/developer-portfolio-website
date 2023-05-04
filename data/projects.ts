import { TProject } from '@/types'

import imageGreen from '@/public/project-greenexp.jpg'
import imageMeteo from '@/public/project-meteostation.jpg'
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
        image: imageOrion,
        label: 'Science projects',
        link: 'https://vk.com/astrorion'
    },
    {
        image: imageGreen,
        label: 'Greenexp travel project',
        link: 'https://greenexp.ru'
    }
]
