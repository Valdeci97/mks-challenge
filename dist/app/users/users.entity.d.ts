export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: string;
    encryptPassword(): Promise<void>;
    constructor(user?: Partial<User>);
}
