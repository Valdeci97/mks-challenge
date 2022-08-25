import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly service;
    constructor(service: AuthService);
    login(req: any): Promise<{
        token: string;
    }>;
}
