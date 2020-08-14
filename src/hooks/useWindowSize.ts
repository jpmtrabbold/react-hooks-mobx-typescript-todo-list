import { useState, useEffect, useCallback } from "react"

// Hook
export default function useWindowSize() {
    const isClient = typeof window === 'object'
    
    const getSize = useCallback(() => {
        return {
            width: isClient ? window.innerWidth : 800,
            height: isClient ? window.innerHeight : 600,
        }
    }, [isClient])

    const [windowSize, setWindowSize] = useState(getSize)

    useEffect(() => {
        if (!isClient) {
            return
        }

        function handleResize() {
            setWindowSize(getSize())
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [isClient, getSize]) // Empty array ensures that effect is only run on mount and unmount

    return windowSize
}