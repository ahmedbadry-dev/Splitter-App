
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
}

export default DOMHelpers