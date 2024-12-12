export const cn = (...args: (string | boolean | undefined)[]): string => args.filter((item: any) => !!item).join(' ')
