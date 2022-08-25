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
exports.MovieController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const badRequest_swagger_1 = require("../swagger/exceptions/badRequest.swagger");
const notFound_swagger_1 = require("../swagger/exceptions/notFound.swagger");
const movie_swagger_1 = require("../swagger/movie.swagger");
const saveMovie_dto_1 = require("./dto/saveMovie.dto");
const updateMovie_dto_1 = require("./dto/updateMovie.dto");
const movie_service_1 = require("./movie.service");
let MovieController = class MovieController {
    constructor(service) {
        this.service = service;
    }
    async save(body) {
        return this.service.save(body);
    }
    async find() {
        return this.service.find();
    }
    async findOne(id) {
        return this.service.findOne(id);
    }
    async udpate(id, body) {
        return this.service.update(id, body);
    }
    async delete(id) {
        await this.service.delete(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create new movie.' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Movie has been successfully created',
        type: movie_swagger_1.SwaggerMovie,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request',
        type: badRequest_swagger_1.BadRequestSwagger,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [saveMovie_dto_1.SaveMovieDto]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "save", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Returns an array with all movies.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Request OK.',
        type: movie_swagger_1.SwaggerMovie,
        isArray: true,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request',
        type: badRequest_swagger_1.BadRequestSwagger,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "find", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Returns movie information by id.' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Request OK.', type: movie_swagger_1.SwaggerMovie }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request',
        type: badRequest_swagger_1.BadRequestSwagger,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'There is no movie with such id.',
        type: notFound_swagger_1.NotFoundSwagger,
    }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a movie information by id.' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Movie updated successfully.',
        type: movie_swagger_1.SwaggerMovie,
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request',
        type: badRequest_swagger_1.BadRequestSwagger,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'There is no movie with such id.',
        type: notFound_swagger_1.NotFoundSwagger,
    }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateMovie_dto_1.UpdateMovieDto]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "udpate", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a movie by id.' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Movie deleted successfully.' }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad request',
        type: badRequest_swagger_1.BadRequestSwagger,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'There is no movie with such id.',
        type: notFound_swagger_1.NotFoundSwagger,
    }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MovieController.prototype, "delete", null);
MovieController = __decorate([
    (0, common_1.Controller)('movies'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    (0, swagger_1.ApiTags)('Movies'),
    __metadata("design:paramtypes", [movie_service_1.MovieService])
], MovieController);
exports.MovieController = MovieController;
//# sourceMappingURL=movie.controller.js.map