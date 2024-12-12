import { cn } from './tools'

describe('cn', () => {
    it('should join multiple class names into a single string', () => {
        expect(cn('class1', 'class2', 'class3')).toBe('class1 class2 class3')
    })

    it('should filter out falsy values', () => {
        expect(cn('class1', false, 'class2', undefined, 'class3')).toBe('class1 class2 class3')
    })

    it('should return an empty string if all values are falsy', () => {
        expect(cn(false, undefined, '')).toBe('')
    })

    it('should handle a mix of truthy and falsy values', () => {
        expect(cn('class1', '', 'class2', false, 'class3', undefined)).toBe('class1 class2 class3')
    })
})
