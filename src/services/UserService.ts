import User from "../models/user";

class UserService {
    users: Map<string, User>

    constructor() {
        this.users = new Map<string, User>()
    }

    addUser(name: string): User {
        if (!name || typeof name !== 'string') {
            throw new Error("User name is required and must be a string")
        }

        const trimmedName = name.trim()
        if (this.users.has(trimmedName)) {
            throw new Error("This name is already added")
        }
        
        const user = new User(trimmedName)
        this.users.set(trimmedName, user)
        return user
    }

    getUser(name: string): User | undefined {
        if (!name || typeof name !== 'string') {
            throw new Error("User name is required and must be a string")
        }
        return this.users.get(name.trim())
    }

    getAllUsers(): User[] {
        return Array.from(this.users.values())
    }

    getAllUsersName(): string[] {
        return Array.from(this.users.keys())
    }

    hasUser(name: string):boolean {
        return this.users.has(name)
    }

    getUsersCount(): number{
        return this.users.size
    }

    removeUser(name: string): boolean {
        if (!name || typeof name !== 'string') {
            throw new Error("User name is required and must be a string")
        }
        return this.users.delete(name.trim())
    }
    clear(): void{
        this.users.clear()
    }
}

export default UserService
