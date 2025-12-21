import UserService from "../services/UserService";
import ExpenseService from "../services/expenseService";
import DOMHelpers from "./DOMHelpers";

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
            userInput: DOMHelpers.getElementById('addUser') as HTMLInputElement
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
            // rest the form 
            this.elements.addUserForm.reset()
            console.log(`User ${user.username} added`);
            console.log(`Number of user is ${this.userService.getUsersCount()} added`);
            
        } catch (error) {
            console.error('Error adding User', error)
        }
    }

    // initializeSelectBox(){}
}

// initialize all the UI elements

// bind events

// take care of the expense select box
export default ExpenseUI