"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PASSWORD = void 0;
const REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
const MESSAGE = 'Password must contain at least 8 characters with capital and small letters, numbers and special characters';
exports.PASSWORD = {
    REGEX,
    MESSAGE,
};
//# sourceMappingURL=password.utils.js.map