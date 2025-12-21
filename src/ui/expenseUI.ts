import UserService from "../services/UserService";
import ExpenseService from "../services/expenseService";
import DOMHelpers from "./DOMHelpers";
import {showToast } from'../utils/toastUtile'
interface IExpenseUI {
    userService: UserService,
    expenseService: ExpenseService,

    initializeElements() : void
    bindEvent(): void
    // initializeSelectBox(): void
    handleAddUser(e: Event): void
}

class ExpenseUI implements IExpenseUI{
    userService: UserService
    expenseService: ExpenseService
    elements!: { 
        addUserForm: HTMLFormElement,
        userInput:  HTMLInputElement, 
        expenseUserInput: HTMLSelectElement,
    };

    constructor(userService: UserService, expenseService: ExpenseService){
        this.userService = userService
        this.expenseService = expenseService

        this.initializeElements()
        this.bindEvent()
        // this.initializeSelectBox()
    }

    initializeElements(): void {
        this.elements = {
            addUserForm: DOMHelpers.getElementById('addUserForm') as HTMLFormElement,
            userInput: DOMHelpers.getElementById('addUser') as HTMLInputElement,
            expenseUserInput: DOMHelpers.getElementById('expenseUserInput') as HTMLSelectElement,
        }
    }

    bindEvent(): void{
        this.elements?.addUserForm?.addEventListener('submit', (e) => {
            this.handleAddUser(e) 
        })
    }

    handleAddUser(e: Event){
        e.preventDefault()

        try {
            // get the user name provided by the user
            const name = this.elements?.userInput.value.trim()
            // check if user name is give
            if (!name) {
                throw new Error("User name is required");
            }
            // use the user service to add the user 
            const user = this.userService.addUser(name)
            // add the user to select box
            this.addUserToSelectBox(user.username)
            // rest the form 
            this.elements.addUserForm.reset()
            showToast(`User ${user.username} added`);
            
            
        } catch (error) {
            console.error('Error adding User', error)
            showToast(`${error}`, 'error')
        }
    }

    // initializeSelectBox(){
    //     // get the select box element
        
    //     // get all users from user service
    //     const users = this.userService.getAllUsers()
    //     // create option then append it to select   
        
    //     // add users to select box
    //     this.elements.expenseUserInput.appendChild(fragOption)
    // }

    addUserToSelectBox(username: string){
        const option = DOMHelpers.createOption(username, username)
        this.elements.expenseUserInput.add(option)
    }

}

export default ExpenseUI