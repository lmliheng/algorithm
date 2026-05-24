import screenfull from 'screenfull'

export const useScreenFull = () => {
    const isFullscreen = () => {
        return screenfull.isFullscreen
    }

    const toggleFullscreen = () => {
        if (screenfull.isEnabled) {
            screenfull.toggle()
        }
    }

    return { isFullscreen, toggleFullscreen }
}
