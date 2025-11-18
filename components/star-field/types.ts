/**
 * Props for the StarField component.
 */
export interface StarFieldProps {
    /**
     * Factor to control the speed of the star field animation.
     * @default 0.05
     */
    speedFactor?: number

    /**
     * Background color of the star field.
     * @default 'black'
     */
    backgroundColor?: string

    /**
     * RGB color of the stars.
     * @default [255, 255, 255]
     */
    starColor?: [number, number, number]

    /**
     * Number of stars to render in the star field.
     * @default 5000
     */
    starCount?: number
}
