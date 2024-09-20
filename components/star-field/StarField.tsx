'use client'

import React, { useEffect } from 'react'

interface StarFieldProps {
    speedFactor?: number
    backgroundColor?: string
    starColor?: [number, number, number]
    starCount?: number
}

export const StarField: React.FC<StarFieldProps> = (props) => {
    const { speedFactor = 0.05, backgroundColor = 'black', starColor = [255, 255, 255], starCount = 5000 } = props

    useEffect(() => {
        const canvas = document.getElementById('starfield') as HTMLCanvasElement

        if (canvas) {
            const canvasRendering = canvas.getContext('2d')

            if (canvasRendering) {
                let w = window.innerWidth
                let h = window.innerHeight

                const setCanvasExtents = () => {
                    canvas.width = w
                    canvas.height = h
                }

                setCanvasExtents()

                window.onresize = () => {
                    setCanvasExtents()
                }

                const makeStars = (count: number) => {
                    const out = []
                    for (let i = 0; i < count; i++) {
                        const s = {
                            x: Math.random() * 1600 - 800,
                            y: Math.random() * 900 - 450,
                            z: Math.random() * 1000
                        }
                        out.push(s)
                    }
                    return out
                }

                const stars = makeStars(starCount)

                const clear = () => {
                    canvasRendering.fillStyle = backgroundColor
                    canvasRendering.fillRect(0, 0, canvas.width, canvas.height)
                }

                const putPixel = (x: number, y: number, brightness: number) => {
                    canvasRendering.fillStyle =
                        'rgba(' + starColor[0] + ',' + starColor[1] + ',' + starColor[2] + ',' + brightness + ')'
                    canvasRendering.fillRect(x, y, 1, 1)
                }

                const moveStars = (distance: number) => {
                    const count = stars.length
                    for (let i = 0; i < count; i++) {
                        const s = stars[i]
                        s.z -= distance
                        while (s.z <= 1) {
                            s.z += 1000
                        }
                    }
                }

                let prevTime: number
                const init = (time: number) => {
                    prevTime = time
                    requestAnimationFrame(tick)
                }

                const tick = (time: number) => {
                    const elapsed = time - prevTime
                    prevTime = time

                    moveStars(elapsed * speedFactor)

                    clear()

                    const cx = w / 2
                    const cy = h / 2

                    const count = stars.length
                    for (let i = 0; i < count; i++) {
                        const star = stars[i]

                        const x = cx + star.x / (star.z * 0.001)
                        const y = cy + star.y / (star.z * 0.001)

                        if (x < 0 || x >= w || y < 0 || y >= h) {
                            continue
                        }

                        const d = star.z / 1000.0
                        const b = 1 - d * d

                        putPixel(x, y, b)
                    }

                    requestAnimationFrame(tick)
                }

                requestAnimationFrame(init)

                window.addEventListener('resize', function () {
                    w = window.innerWidth
                    h = window.innerHeight
                    setCanvasExtents()
                })
            } else {
                console.error('Could not get 2d context from canvas element')
            }
        } else {
            console.error('Could not find canvas element with id "starfield"')
        }

        return () => {
            window.onresize = null
        }
    }, [starColor, backgroundColor, speedFactor, starCount])

    return (
        <canvas
            id='starfield'
            style={{
                padding: 0,
                margin: 0,
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                zIndex: 1,
                opacity: 1,
                pointerEvents: 'none',
                mixBlendMode: 'screen'
            }}
        ></canvas>
    )
}

export default StarField
