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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_entity_1 = require("./users.entity");
let UsersService = class UsersService {
    constructor(repository) {
        this.repository = repository;
    }
    async save(user) {
        const createdUser = this.repository.create(user);
        await this.repository.save(createdUser);
        return createdUser;
    }
    async find() {
        const users = await this.repository.find({
            select: ['id', 'name', 'email', 'createdAt'],
        });
        return users;
    }
    async findOne(id) {
        try {
            const user = await this.repository.findOneByOrFail({ id });
            return user;
        }
        catch (err) {
            throw new common_1.NotFoundException(err.message);
        }
    }
    async update(id, user) {
        try {
            const dbUser = await this.repository.findOneByOrFail({ id });
            const updatedUser = this.repository.merge(dbUser, user);
            return this.repository.save(updatedUser);
        }
        catch (err) {
            throw new common_1.NotFoundException(err.message);
        }
    }
    async delete(id) {
        const user = await this.repository.softDelete(id);
        if (!user.affected) {
            throw new common_1.NotFoundException('there is no user with such id');
        }
    }
    async findByEmail(email) {
        const user = await this.repository.findOne({ where: { email } });
        return user;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map