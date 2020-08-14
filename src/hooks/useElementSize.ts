import { useState, useEffect } from "react"

const getSize = (thisElement: HTMLElement | undefined | null) => {
    if (!thisElement) {
        return {
            width: 0,
            height: 0,
        }
    }
    return {
        width: thisElement.clientWidth,
        height: thisElement.clientHeight,
    }
}

export default function useElementSize(element: HTMLElement | undefined | null) {
    
    
    const [elementSize, setElementSize] = useState(getSize(element))
    
    useEffect(() => {
        setElementSize(getSize(element))
    }, [element])

    useEffect(() => {
        function handleResize() {
            setElementSize(getSize(element))
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [element])

    return elementSize
}