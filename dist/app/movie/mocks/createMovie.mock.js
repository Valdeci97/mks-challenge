"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createdMovie = exports.createMovieBody = void 0;
const movie_entity_1 = require("../movie.entity");
exports.createMovieBody = {
    name: '2012',
    director: 'Roland Emmerich',
    releaseYear: 2009,
    rating: 3.2,
};
exports.createdMovie = new movie_entity_1.Movie(Object.assign(Object.assign({ id: 'abc34' }, exports.createMovieBody), { createdAt: '2022-08-22T21:25:05', updatedAt: '2022-08-23T21:25:06' }));
//# sourceMappingURL=createMovie.mock.js.map