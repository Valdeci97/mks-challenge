import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private readonly service;
    private message;
    constructor(service: AuthService);
    validate(email: string, password: string): Promise<import("../../app/users/users.entity").User>;
}
export {};
