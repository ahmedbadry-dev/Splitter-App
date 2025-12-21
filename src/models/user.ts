interface IUser {
    readonly id: string
    username: string
    generateId(): string
}

class User implements IUser {
    readonly id: string;
    username: string;

    constructor(username: string) {
        if (!username || typeof username !== 'string') {
            throw new Error("User name must be a non-empty string");
        }

        this.username = username.trim()
        this.id = this.generateId()
    }

    generateId(): string {
        return crypto.randomUUID()
    }
}

export default User
