import Expense from '../models/expense'
import UserService from './UserService'

interface IExpenseService {
    expenses: Expense[],
    userService: UserService,

    addExpense(paidBy: string, amount: number, description?: string): Expense
    getExpenseByUser(name: string): Expense[]
    getAllExpenses(): Expense[]
    getExpenseCount(): number
    clear(): void
}


class ExpenseService implements IExpenseService {
    expenses: Expense[]
    userService: UserService

    constructor(userService: UserService) {
        this.expenses = []
        this.userService = userService
    }

    addExpense(paidBy: string, amount: number, description?: string): Expense {
        if (!paidBy || typeof paidBy !== 'string') {
            throw new Error("paidBy must be a string")
        }

        const trimmedPaidBy = paidBy.trim()

        if (!this.userService.hasUser(trimmedPaidBy)) {
            throw new Error("User does not exist")
        }

        if (typeof amount !== 'number' || amount <= 0) {
            throw new Error("Amount must be a positive number")
        }

        const expense = new Expense(trimmedPaidBy, amount, description)
        this.expenses.push(expense)
        return expense
    }

    getExpenseByUser(userName: string): Expense[] {
        return this.expenses.filter(
            expense => expense.paidBy === userName.trim()
        )
    }

    getAllExpenses(): Expense[] {
        return [...this.expenses]
    }

    getExpenseCount(): number {
        return this.expenses.length
    }

    // removeExpenseByUserName(userName: string): number {
    //     const before = this.expenses.length
    //     this.expenses = this.expenses.filter(
    //         expense => expense.paidBy !== userName.trim()
    //     )
    //     return before - this.expenses.length
    // }

    clear(): void {
        this.expenses = []
    }

    // simplifyExpenses(){}
}

export default ExpenseService
