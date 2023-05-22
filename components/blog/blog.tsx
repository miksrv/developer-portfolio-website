import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'

import { EIcons } from '@/types'

import styles from '@/components/blog/blog.module.css'
import Gallery from '@/components/blog/gallery'
import { TBlog } from '@/components/blog/types'
import SvgIcons from '@/components/svgIcons/svgIcons'

const Blog: NextPage = () => {
    const [data, setData] = useState<TBlog>()
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch('https://astro.miksoft.pro/api/blog?limit=1')
            .then((res) => res.json())
            .then((data) => {
                setData(data?.items?.[0])
                setLoading(false)
            })
    }, [])

    const formatDate = (date: number) =>
        new Date(date).toLocaleDateString('en-us', {
            day: 'numeric',
            month: 'short',
            weekday: 'long',
            year: 'numeric'
        })

    return (
        <section>
            {!isLoading && data ? (
                <div>
                    {data?.media && (
                        <Gallery
                            media={data.media}
                            groupId={data.group_id}
                        />
                    )}
                    <p className={styles.blogText}>{data?.text}</p>
                    <div className={styles.blogFooter}>
                        <span className={styles.parameter}>
                            <SvgIcons name={EIcons.eye} /> {data.views}
                        </span>
                        <span className={styles.parameter}>
                            <SvgIcons name={EIcons.repost} /> {data.forwards}
                        </span>
                        <span className={styles.parameter}>
                            <SvgIcons name={EIcons.comment} /> {data.replies}
                        </span>
                        <span className={styles.parameter}>
                            <SvgIcons name={EIcons.like} />
                            {data.reactions?.reduce(
                                (count: number, reaction) =>
                                    count + reaction.count,
                                0
                            ) || 0}
                        </span>
                        <div className={styles.blogDate}>
                            <a
                                href={`https://t.me/nearspace/${data.telegram_id}`}
                                title={'Read this post in telegram channel'}
                                rel={'nofollow'}
                            >
                                {formatDate(data?.telegram_date * 1000)}
                            </a>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.loading}>Wait for loading...</div>
            )}
        </section>
    )
}

export default Blog
