import ExpenseUI from "./ui/expenseUI";
import UserService from "./services/UserService";
import ExpenseService from "./services/expenseService";

class ExpenseApp {
    private userService: UserService
    private expenseService: ExpenseService
    ui!: ExpenseUI

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

let expenseApp: ExpenseApp;
document.addEventListener('DOMContentLoaded', () => {
    expenseApp = new ExpenseApp()
    expenseApp.init()
})


window.addEventListener('load', () => {
    if (!expenseApp) {
        expenseApp = new ExpenseApp()
        expenseApp.init()
    }
})