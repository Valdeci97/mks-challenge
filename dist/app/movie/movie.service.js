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
exports.MovieService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const movie_entity_1 = require("./movie.entity");
let MovieService = class MovieService {
    constructor(repository) {
        this.repository = repository;
    }
    async save(movie) {
        const createdMovie = this.repository.create(movie);
        await this.repository.save(createdMovie);
        return createdMovie;
    }
    async find() {
        const movies = await this.repository.find();
        return movies;
    }
    async findOne(id) {
        try {
            const movie = await this.repository.findOneByOrFail({ id });
            return movie;
        }
        catch (err) {
            throw new common_1.NotFoundException(err.message);
        }
    }
    async update(id, movie) {
        try {
            const dbMovie = await this.repository.findOneByOrFail({ id });
            const updatedMovie = this.repository.merge(dbMovie, movie);
            return this.repository.save(updatedMovie);
        }
        catch (err) {
            throw new common_1.NotFoundException(err.message);
        }
    }
    async delete(id) {
        const movie = await this.repository.softDelete(id);
        if (!movie.affected) {
            throw new common_1.NotFoundException('there is no movie with such id');
        }
    }
};
MovieService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(movie_entity_1.Movie)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MovieService);
exports.MovieService = MovieService;
//# sourceMappingURL=movie.service.js.map