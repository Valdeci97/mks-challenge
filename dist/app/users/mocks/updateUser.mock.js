"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatedUser = exports.updateUserBody = void 0;
const users_entity_1 = require("../users.entity");
exports.updateUserBody = {
    name: 'usuário teste da silva',
};
exports.updatedUser = new users_entity_1.User(Object.assign(Object.assign({ id: 'abc34' }, exports.updateUserBody), { email: 'user@test.com', password: 'Senhaforte123*', createdAt: '2022-08-22T21:25:05' }));
//# sourceMappingURL=updateUser.mock.js.map