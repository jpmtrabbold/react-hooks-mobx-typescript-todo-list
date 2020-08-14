import { useCallback } from "react"
import useWindowEventListener from "./useWindowEventListener"

const useBeforeUnloadPage = (message: string, condition?: () => boolean) => {
    const listener = useCallback((e: Event) => {
        if (!condition || condition()) {
            
            e.preventDefault();
            
            (e.returnValue as any) = message
            return message //Gecko + Webkit, Safari, Chrome etc.
        }
    }, [message, condition])
    useWindowEventListener("beforeunload", listener)
}

export default useBeforeUnloadPage