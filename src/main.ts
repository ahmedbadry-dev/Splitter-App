import ExpenseUI from "./ui/expenseUI";
import UserService from "./services/UserService";
import ExpenseService from "./services/expenseService";

class ExpenseApp {
    private userService: UserService
    private expenseService: ExpenseService
    private ui!: ExpenseUI

    constructor(){
        this.userService = new UserService()
        this.expenseService = new ExpenseService(this.userService)
    }

    init(): void {
        try {
            this.ui = new ExpenseUI(this.userService, this.expenseService)
            console.log('Splitter App initialized successfully')
        } catch (error) {
            console.error('Failed to initialize Splitter App', error)
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const expenseApp = new ExpenseApp()
    expenseApp.init()
})
