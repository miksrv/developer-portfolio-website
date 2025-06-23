import React from 'react'

import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { NextSeo } from 'next-seo'

import astronaut from '@/public/astronaut.png'

type NotFoundProps = object

const NotFound: NextPage<NotFoundProps> = () => (
    <div className={'page404'}>
        <NextSeo
            nofollow={true}
            noindex={true}
        />
        <div className={'container'}>
            <h1>{'404 — Lost in Space'}</h1>
            <h2>{'Oops! This page drifted off into a black hole'}</h2>
            <div className={'description'}>
                <div>
                    <p>{'As a developer, I know this might be a bug'}</p>
                    <p>{'As an astronomer, I prefer to call it a cosmic anomaly'}</p>
                    <Link
                        href='/'
                        title={'Go to main page'}
                        className={'link'}
                    >
                        {'Go to home'}
                    </Link>
                </div>
                <Image
                    className={'astronaut'}
                    src={astronaut}
                    alt={''}
                />
            </div>
        </div>
    </div>
)

export default NotFound
