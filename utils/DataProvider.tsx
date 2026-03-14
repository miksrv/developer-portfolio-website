'use client'

import React, { createContext, useContext } from 'react'

import data from '@/public/data.json'

export type SiteDataType = typeof data | null

const DataContext = createContext<SiteDataType>(null)

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <DataContext.Provider value={data}>{children}</DataContext.Provider>
}

export const useSiteData = () => useContext(DataContext)
