class Utils {
    static getCssVar(name: string, document: Document): string {
        return getComputedStyle(document.documentElement).getPropertyValue(name)
    }
}

export default Utils;