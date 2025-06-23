export const cn = (...args: Array<string | boolean | undefined>): string => args.filter((item) => !!item).join(' ')
