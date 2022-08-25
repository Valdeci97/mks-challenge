"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createdUser = exports.createUserBody = void 0;
const users_entity_1 = require("../users.entity");
exports.createUserBody = {
    name: 'usuário teste',
    email: 'user@test.com',
    password: 'Senhaforte123*',
};
exports.createdUser = new users_entity_1.User(Object.assign(Object.assign({ id: 'abc34' }, exports.createUserBody), { createdAt: '2022-08-22T21:25:05' }));
//# sourceMappingURL=createUser.mock.js.map