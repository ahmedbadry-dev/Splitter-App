
class DOMHelpers {
    static getElementById(id: string): HTMLElement {
        const element = document.getElementById(id)

        if (!element) {
            throw new Error(`Element with ${id} is not found`);
            
        }

        return element
    }
}

export default DOMHelpers