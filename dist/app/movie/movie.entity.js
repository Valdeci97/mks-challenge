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
exports.Movie = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let Movie = class Movie {
    constructor(movie) {
        this.id = movie === null || movie === void 0 ? void 0 : movie.id;
        this.name = movie === null || movie === void 0 ? void 0 : movie.name;
        this.director = movie === null || movie === void 0 ? void 0 : movie.director;
        this.releaseYear = movie === null || movie === void 0 ? void 0 : movie.releaseYear;
        this.rating = movie === null || movie === void 0 ? void 0 : movie.rating;
        this.createdAt = movie === null || movie === void 0 ? void 0 : movie.createdAt;
        this.updatedAt = movie === null || movie === void 0 ? void 0 : movie.updatedAt;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Movie.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Movie.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Movie.prototype, "director", void 0);
__decorate([
    (0, typeorm_1.Column)('int', { name: 'release_year' }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Movie.prototype, "releaseYear", void 0);
__decorate([
    (0, typeorm_1.Column)('double precision'),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], Movie.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Movie.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], Movie.prototype, "updatedAt", void 0);
Movie = __decorate([
    (0, typeorm_1.Entity)({ name: 'movies' }),
    __metadata("design:paramtypes", [Object])
], Movie);
exports.Movie = Movie;
//# sourceMappingURL=movie.entity.js.map