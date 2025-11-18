import type { Config } from 'jest'

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '\\.(css|sass|scss)$': 'identity-obj-proxy',
        '\\.(jpg|jpeg|png)$': 'identity-obj-proxy',
        '^@/(.*)$': '<rootDir>/$1'
    },
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                babel: true,
                tsconfig: 'tsconfig.jest.json'
            }
        ]
    },
    setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'],
    collectCoverageFrom: ['components/**/*.{ts,tsx}', '!components/**/*.d.ts', '!components/**/*.test.{ts,tsx}', '!components/**/index.ts', '!components/**/types.ts', '!components/**/constants.ts'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    transformIgnorePatterns: ['node_modules/(?!(module-to-transform)/)', '/.next/']
}

export default config
