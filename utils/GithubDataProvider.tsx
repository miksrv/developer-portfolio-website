import React, { createContext, useContext } from 'react'

import type { GithubData } from './github-fetch'

const GithubDataContext = createContext<GithubData | null>(null)

export const GithubDataProvider: React.FC<{
    children: React.ReactNode
    data: GithubData | null
}> = ({ children, data }) => <GithubDataContext.Provider value={data}>{children}</GithubDataContext.Provider>

export const useGithubData = (): GithubData | null => useContext(GithubDataContext)
