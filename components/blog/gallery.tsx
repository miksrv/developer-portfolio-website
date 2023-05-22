import Image from 'next/image'
import Carousel from 'nuka-carousel'
import React, { useState } from 'react'
import ReactPlayer from 'react-player'

import { EIcons } from '@/types'

import { TBlogMedia } from '@/components/blog/types'
import SvgIcons from '@/components/svgIcons/svgIcons'

import styles from './blog.module.css'

type TPostGalleryProps = {
    groupId: number
    media?: TBlogMedia[]
}

const config = {
    attributes: {
        controlsList: 'nodownload',
        disablePictureInPicture: true
    }
}

const PostGallery: React.FC<TPostGalleryProps> = ({ media, groupId }) => {
    const [playVideo, setPlayVideo] = useState<boolean>(false)

    const imageUrl = `https://astro.miksoft.pro/api/posts/${groupId}/`

    return (
        <Carousel
            adaptiveHeight={true}
            withoutControls={media?.length === 1 || playVideo}
            className={styles.slider}
            defaultControlsConfig={{
                nextButtonClassName: styles.sliderNextButton,
                nextButtonText: <SvgIcons name={EIcons.right} />,
                pagingDotsClassName: styles.sliderDots,
                pagingDotsContainerClassName: styles.sliderDotsContainer,
                prevButtonClassName: styles.sliderPrevButton,
                prevButtonText: <SvgIcons name={EIcons.left} />
            }}
            onDragEnd={() => setPlayVideo(false)}
        >
            {media?.map((item) => (
                <div
                    className={styles.sliderItem}
                    key={item.file}
                >
                    <div
                        className={styles.sliderItemBackground}
                        style={{
                            backgroundImage:
                                item.file_type !== 'video/mp4'
                                    ? `url(${imageUrl}${item.file})`
                                    : undefined
                        }}
                    />
                    {item.file_type === 'video/mp4' ? (
                        <ReactPlayer
                            url={`${imageUrl}${item.file}`}
                            controls={true}
                            onPause={() => setPlayVideo(false)}
                            onEnded={() => setPlayVideo(false)}
                            onPlay={() => setPlayVideo(true)}
                            // @ts-ignore
                            config={config}
                        />
                    ) : (
                        <Image
                            className={styles.sliderImage}
                            src={`${imageUrl}${item.file}`}
                            alt={'Фотография астрономического блока'}
                            width={item.width}
                            height={item.height}
                        />
                    )}
                </div>
            ))}
        </Carousel>
    )
}

export default PostGallery
