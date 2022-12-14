"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
require("dotenv/config");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const core_1 = require("@nestjs/core");
const cache_manager_redis_store_1 = require("cache-manager-redis-store");
const movie_module_1 = require("./app/movie/movie.module");
const users_module_1 = require("./app/users/users.module");
const auth_module_1 = require("./auth/auth.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                entities: [__dirname + '/**/**.entity{.ts, .js}'],
                migrations: [__dirname + '../migrations/*{.ts, .js}'],
                autoLoadEntities: true,
                logging: true,
            }),
            common_1.CacheModule.register({
                store: cache_manager_redis_store_1.default,
                socket: {
                    host: process.env.DB_CACHE_HOST,
                    port: process.env.DB_CACHE_PORT,
                },
            }),
            movie_module_1.MovieModule,
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
        ],
        controllers: [],
        providers: [{ provide: core_1.APP_INTERCEPTOR, useClass: common_1.CacheInterceptor }],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map