import { Role } from './role';

export class User {
    email?: string;
    firstName?: string;
    lastName?: string;
    userId?: number;
    password?: string;
    role?: Role;
}
