// ── Types ─────────────────────────────────────────────────────────────────────

export type ContributionLevel = 0 | 1 | 2 | 3 | 4

export interface Contribution {
    date: string
    count: number
    level: ContributionLevel
}

export interface ContributionYear {
    contributions: Contribution[]
    total: Record<string, number>
}

export interface GithubUser {
    login: string
    publicRepos: number
    followers: number
    following: number
}

export interface GithubStats {
    totalStars: number
    totalForks: number
    languageDistribution: Record<string, number>
}

export interface GithubRepo {
    name: string
    description: string | null
    url: string
    stars: number
    forks: number
    language: string | null
}

export interface GithubData {
    contributions: ContributionYear | null
    user: GithubUser | null
    stats: GithubStats | null
    topRepos: GithubRepo[] | null
}

// ── Constants ──────────────────────────────────────────────────────────────────

const GITHUB_USERNAME = process.env.GITHUB_USERNAME ?? 'miksrv'
const CONTRIBUTIONS_PROXY = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}`
const GITHUB_API = 'https://api.github.com'

function buildHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
        Accept: 'application/vnd.github.v3+json'
    }

    if (process.env.GITHUB_TOKEN) {
        headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
    }

    return headers
}

// ── Fetchers ───────────────────────────────────────────────────────────────────

async function fetchContributions(): Promise<ContributionYear | null> {
    try {
        const res = await fetch(`${CONTRIBUTIONS_PROXY}?y=last`)

        if (!res.ok) {
            return null
        }

        const data = await res.json()

        return {
            contributions: (data.contributions as Contribution[]) ?? [],
            total: (data.total as Record<string, number>) ?? {}
        }
    } catch {
        return null
    }
}

async function fetchUserAndStats(): Promise<{ user: GithubUser; stats: GithubStats; topRepos: GithubRepo[] } | null> {
    try {
        const headers = buildHeaders()

        const [userRes, reposRes] = await Promise.all([
            fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}`, { headers }),
            fetch(`${GITHUB_API}/users/${GITHUB_USERNAME}/repos?per_page=100&type=public`, { headers })
        ])

        if (!userRes.ok) {
            return null
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const userData: any = await userRes.json()

        const user: GithubUser = {
            followers: userData.followers as number,
            following: userData.following as number,
            login: userData.login as string,
            publicRepos: userData.public_repos as number
        }

        let stats: GithubStats = { languageDistribution: {}, totalForks: 0, totalStars: 0 }
        let topRepos: GithubRepo[] = []

        if (reposRes.ok) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const repos: any[] = await reposRes.json()
            const languageDistribution: Record<string, number> = {}
            let totalStars = 0
            let totalForks = 0

            for (const repo of repos) {
                totalStars += (repo.stargazers_count as number) ?? 0
                totalForks += (repo.forks_count as number) ?? 0

                if (repo.language) {
                    const lang = repo.language as string
                    languageDistribution[lang] = (languageDistribution[lang] ?? 0) + 1
                }
            }

            stats = { languageDistribution, totalForks, totalStars }

            topRepos = repos
                .filter((r) => !r.fork)
                .sort((a, b) => (b.stargazers_count as number) - (a.stargazers_count as number))
                .slice(0, 6)
                .map((r) => ({
                    description: (r.description as string | null) ?? null,
                    forks: r.forks_count as number,
                    language: (r.language as string | null) ?? null,
                    name: r.name as string,
                    stars: r.stargazers_count as number,
                    url: r.html_url as string
                }))
        }

        return { stats, topRepos, user }
    } catch {
        return null
    }
}

// ── Main entry point (called from getStaticProps) ─────────────────────────────

export async function fetchGithubData(): Promise<GithubData> {
    const [contributions, userAndStats] = await Promise.all([fetchContributions(), fetchUserAndStats()])

    return {
        contributions,
        stats: userAndStats?.stats ?? null,
        topRepos: userAndStats?.topRepos ?? null,
        user: userAndStats?.user ?? null
    }
}
