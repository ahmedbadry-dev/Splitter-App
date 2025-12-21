import User from "../models/user";

interface IUserSErvice {
    users: Map<string, User>
    validateName(name: string) : string
    addUser(name: string): User
    getUser(name: string): User
    getAllUsers(): User[]
    getAllUsersName(): string[]
    hasUser(name: string): boolean
    getUsersCount(): number
    removeUser(name: string): boolean
    clear(): void
}

class UserService implements IUserSErvice{
    users: Map<string, User>

    constructor() {
        this.users = new Map<string, User>()
    }
    validateName(name: string): string {
        if (!name || typeof name !== 'string') {
            throw new Error("User name is required and must be a string")
        }
        return name.trim()
    }


    addUser(name: string): User {
        const trimmedName = this.validateName(name)
        if (this.users.has(trimmedName)) {
            throw new Error("This name is already added")
        }
        
        const user = new User(trimmedName)
        this.users.set(trimmedName, user)
        return user
    }

    getUser(name: string): User  {
        const trimmedName = this.validateName(name)
        const user = this.users.get(trimmedName)

        if (!user) {
            throw new Error("User not found");
        }

        return user
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
        const trimmedName = this.validateName(name)
        return this.users.delete(trimmedName)
    }
    clear(): void{
        this.users.clear()
    }
}

export default UserService
