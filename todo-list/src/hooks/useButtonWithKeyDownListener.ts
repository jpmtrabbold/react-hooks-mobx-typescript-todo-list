import { useMemo } from "react"
import useKeyDownListener from "./useKeyDownListener"

interface useButtonWithKeyDownListenerProps {
    action: () => any, 
    keyboardCondition: (e: KeyboardEvent) => boolean | undefined, 
    conditionToApplyListener: () => boolean | undefined,
    button: React.ReactNode
}
const useButtonWithKeyDownListener = (props: useButtonWithKeyDownListenerProps) : React.ReactNode | undefined => {
    useKeyDownListener(props.action, props.keyboardCondition, props.conditionToApplyListener)
    const { conditionToApplyListener, button } = props
    return useMemo(() => {
        if (conditionToApplyListener()) {
            return button
        }
    }, [conditionToApplyListener, button])
}

export default useButtonWithKeyDownListener