"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMovieDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const saveMovie_dto_1 = require("./saveMovie.dto");
class UpdateMovieDto extends (0, swagger_1.PartialType)(saveMovie_dto_1.SaveMovieDto) {
}
exports.UpdateMovieDto = UpdateMovieDto;
//# sourceMappingURL=updateMovie.dto.js.map