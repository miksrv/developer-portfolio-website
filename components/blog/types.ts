export type TBlog = {
    id: number
    telegram_id: number
    telegram_date: number
    group_id: number
    views?: number
    forwards?: number
    replies?: number
    text: string
    reactions?: TBlogReaction[]
    media?: TBlogMedia[]
}

export type TBlogMedia = {
    file: string
    file_type: 'image/jpeg' | 'image/png' | 'image/gif' | 'video/mp4'
    height: number
    width: number
}

export type TBlogReaction = {
    emoticon: string
    count: number
}
