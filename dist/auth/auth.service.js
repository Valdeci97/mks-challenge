"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcryptjs_1 = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../app/users/users.service");
let AuthService = class AuthService {
    constructor(service, jwtService) {
        this.service = service;
        this.jwtService = jwtService;
    }
    async validateUser(email, password) {
        const user = await this.service.findByEmail(email);
        if (!user)
            return null;
        const isValidPassword = await (0, bcryptjs_1.compare)(password, user.password);
        if (!isValidPassword)
            return null;
        return user;
    }
    async login(user) {
        const payload = { sub: user.id };
        const token = this.jwtService.sign(payload);
        return { token };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map