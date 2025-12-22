
class DOMHelpers {
static getElementById<T extends HTMLElement>(id: string): T {
    const element = document.getElementById(id)
    if (!element) {
        throw new Error(`Element with id "${id}" not found`)
    }
    return element as T
}


    static createOption(text: string , value: string){
        return new Option(text, value)
    }
    

    static createListItem(
        text: string,
        className: string | string[] = []
    ): HTMLLIElement {
        const li = document.createElement('li')
        li.textContent = text

        if (typeof className === 'string' && className.trim()) {
            li.classList.add(className)
        } else if (Array.isArray(className) && className.length) {
            li.classList.add(...className.filter(c => c.trim()))
        }
    return li
}


    static clearElement(element: HTMLElement): void{
        while(element.firstChild){
            element.removeChild(element.firstChild)
        }
    }

    static appendFragment<T>(
        parent: HTMLElement,
        items: T[],
        createItemFn: (item: T) => HTMLElement
    ): void {
        const fragment = document.createDocumentFragment()

        items.forEach(item => {
            fragment.appendChild(createItemFn(item))
        })

        parent.appendChild(fragment)
    }

    static hideElement(element: HTMLElement): void {
        element.classList.add('hidden')
    }
}

export default DOMHelpers