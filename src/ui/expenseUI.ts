import UserService from "../services/UserService";
import ExpenseService from "../services/expenseService";
import DOMHelpers from "./DOMHelpers";
import {showToast } from'../utils/toastUtile'
import Expense from "../models/expense";
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
        userInput: HTMLInputElement, 
        addExpenseForm: HTMLFormElement,
        expenseUserInput: HTMLSelectElement,
        expenseAmountInput: HTMLInputElement,
        expenseReasonInput: HTMLTextAreaElement,
        paymentList: HTMLUListElement,
        simplifyBtn: HTMLButtonElement,
        resultArea:HTMLUListElement,
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
            addExpenseForm: DOMHelpers.getElementById('addExpenseForm') as HTMLFormElement,
            expenseUserInput: DOMHelpers.getElementById('expenseUserInput') as HTMLSelectElement,
            expenseAmountInput: DOMHelpers.getElementById('expenseAmountInput') as HTMLInputElement,
            expenseReasonInput: DOMHelpers.getElementById('expenseReasonInput') as HTMLTextAreaElement,
            paymentList: DOMHelpers.getElementById('payment-list') as HTMLUListElement,
            simplifyBtn: DOMHelpers.getElementById('simplifyBtn') as HTMLButtonElement,
            resultArea: DOMHelpers.getElementById('resultArea') as HTMLUListElement,
            
        }
    }

    bindEvent(): void{
        this.elements?.addUserForm?.addEventListener('submit', (e) => {
            this.handleAddUser(e) 
        })

        this.elements.addExpenseForm?.addEventListener('submit', (e) => {
            this.handleAddExpense(e)
        })

        this.elements.simplifyBtn?.addEventListener('click', () => {
            this.handleSimplify()
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
            if (error instanceof Error) {
                showToast(error.message, 'error')
            }
        }
    }

    handleAddExpense(e: Event){
        e.preventDefault()

        try {
            // get selected user
            const paidBy = this.elements.expenseUserInput.value.trim()
            // get amount
            const amount = this.elements.expenseAmountInput.valueAsNumber
            // get description
            const description = this.elements.expenseReasonInput.value.trim()


            if (!paidBy) {
                throw new Error("Please select a user");
            }

            if (Number.isNaN(amount) || amount <= 0) {
                throw new Error("Please enter an amount greater than zero")
            }


            // add expense form User expenses
            const expense = this.expenseService.addExpense(paidBy, amount, description)
            
            // render expense to all payment overview
            this.renderExpense(expense)

            // rest the form 
            this.elements.expenseAmountInput.value = ''
            this.elements.expenseReasonInput.value = ''
            // show toast
            showToast(`Expense ${amount} added by ${paidBy}`)
            
        } catch (error) {
            console.error("Error adding Expense:", error)
            if (error instanceof Error) {
                showToast(error.message, 'error')
            }
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

    renderExpense(expense: Expense){
        const formatText = expense.description !== "No description"
        ?
            `${expense.paidBy} paid ${expense.amount}$ for ${expense.description}`
        :
            `${expense.paidBy} paid ${expense.amount}$`

        const listItem = DOMHelpers.createListItem(formatText, 'li-style')
        
        this.elements.paymentList.appendChild(listItem)
    }


    handleSimplify(){
        try {
            const results = this.expenseService.simplifyExpenses()
            this.displayResults(results)
        } catch (error) {
            console.error('Error simplifying expenses', error)
            if (error instanceof Error) {
                showToast(`Error simplifying expenses: ${error.message}`, 'error')
            }
            
        }
    }

    displayResults(results: string[]){
        console.log(results);
        
        DOMHelpers.clearElement(this.elements?.resultArea)
        
        if (results.length === 0) {
            const noResultsItem = DOMHelpers.createListItem('All expense are settled!', "no-results")
            this.elements?.resultArea.appendChild(noResultsItem)
            return;
        }

        DOMHelpers.appendFragment(
            this.elements.resultArea,
            results,
            (result) => DOMHelpers.createListItem(result, "settlement-item")
        )
    }

}

export default ExpenseUI