declare module '*.css'
declare module '*.jpg'
declare module '*.jpeg'

declare module '*.module.sass' {
    const classes: { [key: string]: string }
    export default classes
}

declare module '*.module.scss' {
    const classes: { [key: string]: string }
    export default classes
}

declare module '*.module.css' {
    const classes: { [key: string]: string }
    export default classes
}
