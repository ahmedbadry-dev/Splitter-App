interface IExpense {
    readonly id: string,
    paidBy: string,
    amount: number,
    description?: string,
    timestamp: string,
    generateId(): string
}

class Expense implements IExpense {
    paidBy:string; 
    amount:number;
    description?:string;
    timestamp: string;
    readonly id:string;

    constructor(
        paidBy:string, 
        amount:number,
        description?:string
    ){
        if (!paidBy || typeof paidBy !== 'string') {
            throw new Error("paidBy must be a non-empty string");
        }
        if (!amount || typeof amount !== 'number' || amount <= 0) {
            throw new Error("Amount must be a positive number");
        }

        this.paidBy = paidBy.trim();
        this.amount = parseFloat(amount.toFixed(2));
        this.description = description || 'No description';
        this.timestamp = new Date().toISOString();
        this.id = this.generateId();
    }
    generateId(): string {
        return crypto.randomUUID()
    }
}

export default Expense