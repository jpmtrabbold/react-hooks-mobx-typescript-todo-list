import { useState, useEffect } from "react"

const getScrollInfo = (thisElement: HTMLElement | undefined | null) => {
    if (!thisElement) {
        return {
            reachedBottom: false,
            scrollTop: 0,
            scrollHeight: 0,
            offsetHeight: 0,
        }
    }
    return {
        reachedBottom: (thisElement.offsetHeight > 0 && thisElement.scrollTop === (thisElement.scrollHeight - thisElement.offsetHeight)),
        scrollTop: thisElement.scrollTop,
        scrollHeight: thisElement.scrollHeight,
        offsetHeight: thisElement.offsetHeight,
    }
}

export default function useElementScroll(element: HTMLElement | undefined | null) {

    const [elementScrollInfo, setElementScrollInfo] = useState(() => getScrollInfo(element))

    useEffect(() => {
        setElementScrollInfo(getScrollInfo(element))
    }, [element])

    useEffect(() => {
        if (!element) {
            return
        }

        function handleScroll() {
            setElementScrollInfo(getScrollInfo(element))
        }

        element.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [element])

    return elementScrollInfo
}