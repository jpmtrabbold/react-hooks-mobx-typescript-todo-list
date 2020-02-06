export const assignFromObjectToObject = <T extends Object, T2 extends T>(from: T, to: T2) => {
    for (const key in from) {
        if (from.hasOwnProperty(key)) {
            to[key] = to[key]
        }
    }
}