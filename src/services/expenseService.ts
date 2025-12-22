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

// type Settlement = {
//   from: string
//   to: string
//   amount: number
// }



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

    simplifyExpenses(){
        /**
         * Step 1: Calculate What Each Person Should Pay
         * Alice => 300
         * Bob => 150
         * charlie => 450
         * Total => 900
         * Users => 3
         * Share per person => 900 / 3 = 300
         * 
         * 
         * step 2
         * Figure Out who owes money and who should receive money
         * Alice => 300 => balance is 0
         * Bob => 150 => owes 300 - 150 = 150 
         * Charlie => 450 => Receive 450 - 300 = 150
         * 
         * step 3
         * Match people who owes money with people who should receive money
         * Bob owes 150 => charlie should receive 150
         * results: ["Bob owes Charlie 150"]
         * 
         * 
         */

        const userCount = this.userService.getUsersCount();

        if (userCount === 0) {
            return []
        }

        const net: Record<string, number> = {}
        const userNames = this.userService.getAllUsersName()

        /**
         * net = {
         *  Alice: 0
         *  Bob: 0
         *  Charlie: 0
         * }
         * 
         */
        userNames.forEach((name) => {
            net[name] = 0
        })

        this.expenses.forEach(expense => {

            /**
             * first iteration
             *  share = 100    || "300 / 3"
             * 
             *      in nesting forEach
             *          first name
             *              net['Alice'] += 300 - 100 = +200
             *          second name
             *              net['Bob'] -= 100
             *          there name
             *              net['Charlie'] -= 100
             * 
             *      net after first iteration 
             *          Alice : 200
             *          Bob: -100
             *          Charlie: -100
             *          
             * second iteration
             *  share = 50    || "150 / 3"
             * 
             *      in nesting forEach
             *          first name
             *              net['Alice'] -= 50
             *          second name
             *              net['Bob'] += 150 - 50 = +100
             *          there name
             *              net['Charlie'] -= 50
             * 
             *      net after second iteration 
             *          Alice : 150
             *          Bob: 0
             *          Charlie: -150
             * 
             * there iteration
             *  share = 150    || "450 / 3"
             * 
             *      in nesting forEach
             *          first name
             *              net['Alice'] -= 150
             *          second name
             *              net['Bob'] -= 150
             *          there name
             *              net['Charlie'] += 300
             * 
             *      net after 3 iteration 
             *          Alice : 0
             *          Bob: -15
             *          Charlie: 150
             */

            const Share = expense.amount / userCount

            userNames.forEach(name => {
                if (name === expense.paidBy) {
                    net[name] += (expense.amount - Share)
                }else {
                    net[name] -= Share
                }
            })
        })

        return this.calculateSettlements(net);
    }

    calculateSettlements(net: Record<string, number>): string[]{
        const results = []

        //step1 : filter out balanced people
        const names = Object.keys(net).filter(
            (name) => Math.abs(net[name]) > 0.01
        )

        //step2 : sort bu balance
        names.sort((a, b) => net[a] - net[b]) // ["Bob": -150, "Charlie": +150]

        //step 3: tow-pointer technique

        let i = 0;
        let j = names.length - 1
        

        while (i < j) {
            const creditor = names[j] // person who should receive money
            const debtor = names[i] // person who owes money
            const Settlement = Math.min(-net[debtor], net[creditor])


            if (Settlement > 0.01) {
                net[debtor] += Settlement
                net[creditor] -= Settlement

                results.push(
                    `${debtor} owes ${creditor} ${Settlement.toFixed(2)}$`
                )
            }

            if (Math.abs(net[debtor]) < 0.01) i++
            if (Math.abs(net[creditor]) < 0.01) j--
        }
        
        
        return results
    }
}

export default ExpenseService
