import { StaticImageData } from 'next/image'

import geometki from './images/geometki.jpg'
import meteo from './images/meteostation.jpg'
import space from './images/nearspace.jpg'
import astro from './images/observatory.jpg'

type ProjectType = {
    link: string
    title: string
    image: StaticImageData
    description?: string
}

export const data: ProjectType[] = [
    {
        image: geometki,
        title: 'Interesting places and attractions',
        link: 'https://geometki.com/',
        description:
            'This portal, built on a microservice architecture using Next.js, PHP, and MySQL, helps users discover and share interesting places. It features a user dashboard, map integration, and the ability to upload photos and comments. Users can contribute to existing places and engage with a gamified system of levels, experience points, and reputation, promoting an interactive community.'
    },
    {
        image: astro,
        title: 'Homemade Observatory',
        link: 'https://astro.miksoft.pro/',
        description:
            'A fully automated homemade observatory integrated with an online service. It uses Raspberry Pi, Arduino, and Python for remote control, automation, and image analysis. The web service includes user authentication, real-time images, observatory data, and a calendar for celestial events, combining hardware and software for home-based astronomical exploration.'
    },
    {
        image: meteo,
        title: 'Arduino Weather Station',
        link: 'https://meteo.miksoft.pro/',
        description:
            'An Arduino-based weather station that collects and uploads real-time data to a remote server. It features an API for accessing current and historical weather data, as well as forecasts. This station supports the observatory by providing environmental data, ensuring accurate weather monitoring for optimal operations.'
    },
    {
        image: space,
        title: 'Astronomical Project',
        link: 'https://t.me/nearspace',
        description:
            'Focused on making astronomy accessible, this project shares engaging, science-based content via Telegram. It promotes space knowledge through articles, event updates, and visuals, making complex topics easy to understand. The goal is to inspire curiosity and contribute to the public’s appreciation for space and science.'
    }
]
