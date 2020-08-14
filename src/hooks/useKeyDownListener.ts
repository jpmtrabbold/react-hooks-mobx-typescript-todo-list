import { useEffect } from "react"

const useKeyDownListener = (action: () => any, keyboardCondition: (e: KeyboardEvent) => boolean | undefined, conditionToApplyListener: () => boolean | undefined = () => true) => {
    useEffect(() => {
        function keyListener(e: KeyboardEvent) {
            if (keyboardCondition(e)) {
                action()
                e.stopImmediatePropagation()
                e.stopPropagation()
            }
        }

        if (conditionToApplyListener()) {
            document.addEventListener("keydown", keyListener)
            return () => document.removeEventListener("keydown", keyListener)
        }
    }, [action, keyboardCondition, conditionToApplyListener])
}

export default useKeyDownListener