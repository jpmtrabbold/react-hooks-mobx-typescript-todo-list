import { useEffect, EffectCallback } from "react"

const useInitialMount = (effect: EffectCallback) => {
    useEffect(effect,[])
}

export default useInitialMount