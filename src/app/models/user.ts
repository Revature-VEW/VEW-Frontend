export class User {
    email?: string;
    firstName?: string;
    lastName?: string;
    userId?: number;
    password?: string;

    constructor(userId: number, email: string, firstName: string, lastName: string){
        this.userId = userId;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}
