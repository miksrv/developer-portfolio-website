import { githubFetch } from './githubClient'

describe('githubFetch', () => {
    const endpoint = '/repos/test'
    const cacheKey = `githubCache_${endpoint}`
    const mockData = { name: 'repo', stars: 42 }

    beforeEach(() => {
        localStorage.clear()
        jest.restoreAllMocks()
    })

    it('returns cached data if available and not expired', async () => {
        const now = Date.now()
        localStorage.setItem(cacheKey, JSON.stringify({ data: mockData, timestamp: now }))
        const result = await githubFetch(endpoint)
        expect(result).toStrictEqual({
            status: 200,
            isLoading: false,
            data: mockData,
            error: null
        })
    })

    it('fetches data if cache is expired', async () => {
        const oldTimestamp = Date.now() - 4000 * 1000 // expired
        localStorage.setItem(cacheKey, JSON.stringify({ data: mockData, timestamp: oldTimestamp }))
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => mockData
        })
        const result = await githubFetch(endpoint)
        expect(result.data).toStrictEqual(mockData)
        expect(result.isLoading).toBe(false)
    })

    it('fetches data if force is true', async () => {
        localStorage.setItem(cacheKey, JSON.stringify({ data: mockData, timestamp: Date.now() }))
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            status: 200,
            json: async () => mockData
        })
        const result = await githubFetch(endpoint, true)
        expect(result.data).toStrictEqual(mockData)
        expect(result.isLoading).toBe(false)
    })

    it('returns error if fetch fails', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            status: 500,
            text: async () => 'API error'
        })
        const result = await githubFetch(endpoint)
        expect(result.error).toBe('API error')
        expect(result.status).toBe(500)
        expect(result.isLoading).toBe(false)
    })

    it('returns error if fetch throws', async () => {
        global.fetch = jest.fn().mockRejectedValue(new Error('Network error'))
        const result = await githubFetch(endpoint)
        expect(result.error).toBe('Network error')
        expect(result.status).toBe(0)
        expect(result.isLoading).toBe(false)
    })
})
