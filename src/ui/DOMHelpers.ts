
class DOMHelpers {
    static getElementById(id: string): HTMLElement {
        const element = document.getElementById(id)

        if (!element) {
            throw new Error(`Element with ${id} is not found`);
            
        }

        return element
    }

    static createOption(text: string , value: string){
        return new Option(text, value)
    }
    

    static createListItem(text: string, className: string=''): HTMLLIElement{
        const li = document.createElement('li')
        li.textContent = text

        if (className) {
            li.classList.add(className)
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

}

export default DOMHelpers