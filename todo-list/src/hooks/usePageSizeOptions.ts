import { useMemo } from "react"


const usePageSizeOptions = (totalCountOrRecords?: number | Object[], possiblePageSizesParam?: number[]) => {
    const possiblePageSizes = useMemo(() => possiblePageSizesParam || [5, 10, 20, 50, 100, 200], [possiblePageSizesParam])
    const pageSizeOptions = useMemo<number[]>(() => {
        
        let totalCount = 0
        if (!totalCountOrRecords) {
            totalCount = 0
        }
        else if (Array.isArray(totalCountOrRecords) || (typeof totalCountOrRecords === 'object' && (totalCountOrRecords as Object).hasOwnProperty('length'))) {
            totalCount = totalCountOrRecords.length
        } else {
            totalCount = totalCountOrRecords as number
        }
        
        let options = [] as number[]

        for (let index = 0; index < possiblePageSizes.length; index++) {
            const possiblePageSize = possiblePageSizes[index]

            if (possiblePageSize === totalCount) {
                options.push(possiblePageSize)
                break
            } else if (possiblePageSize > totalCount) {
                options.push(totalCount)
                break
            } else {
                options.push(possiblePageSize)
            }
        }
        if (options.length <= 1) {
            options = [possiblePageSizes[0]]
        }
        return options
    }, [totalCountOrRecords, possiblePageSizes])

    return pageSizeOptions
}

export default usePageSizeOptions