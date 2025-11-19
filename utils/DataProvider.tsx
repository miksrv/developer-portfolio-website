'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

import data from '@/public/data.json'

export type SiteDataType = typeof data | null

const DataContext = createContext<SiteDataType>(null)

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [data, setData] = useState<SiteDataType>(null)

    useEffect(() => {
        fetch('/data.json')
            .then((res) => res.json())
            .then(setData)
            .catch(() => setData(null))
    }, [])

    return <DataContext.Provider value={data}>{children}</DataContext.Provider>
}

export const useSiteData = () => useContext(DataContext)
