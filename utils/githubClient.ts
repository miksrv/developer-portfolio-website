'use client'

const BASE_URL = 'https://api.github.com'
const CACHE_TTL_SECONDS = 3600 // cache time-to-live in seconds

function getCacheKey(endpoint: string) {
    return `githubCache_${endpoint}`
}

export const githubFetch = async (endpoint: string, force = false) => {
    const cacheKey = getCacheKey(endpoint)
    let status = 200
    let isLoading = true
    let data = null
    let error = null

    if (!force) {
        const cached = localStorage.getItem(cacheKey)
        if (cached) {
            try {
                const { data: cachedData, timestamp } = JSON.parse(cached)
                const now = Date.now()
                if ((now - timestamp) / 1000 < CACHE_TTL_SECONDS) {
                    isLoading = false
                    data = cachedData
                    return { status, isLoading, data, error }
                }
            } catch (e) {
                console.error('Error parsing cache:', e)
            }
        }
    }

    try {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
            headers: {
                Accept: 'application/vnd.github+json',
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
        status = res.status
        if (!res.ok) {
            error = await res.text()
            isLoading = false
            return { status, isLoading, data, error }
        }
        data = await res.json()
        localStorage.setItem(
            cacheKey,
            JSON.stringify({
                data,
                timestamp: Date.now()
            })
        )
        isLoading = false
        return { status, isLoading, data, error }
    } catch (e: any) {
        status = 0
        error = e.message || 'Unknown error'
        isLoading = false
        return { status, isLoading, data, error }
    }
}
