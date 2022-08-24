import 'dotenv/config';
import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import redisStore from 'cache-manager-redis-store';
import { MovieModule } from './app/movie/movie.module';
import { UsersModule } from './app/users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/**.entity{.ts, .js}'],
      migrations: [__dirname + '../migrations/*{.ts, .js}'],
      autoLoadEntities: true,
      synchronize: true, // Não utilizar isso em produção para evitar perder dados no banco de dados.
      logging: true,
    }),
    CacheModule.register({
      store: redisStore,
      socket: {
        host: process.env.DB_CACHE_HOST,
        port: process.env.DB_CACHE_PORT,
      },
    }),
    MovieModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [{ provide: APP_INTERCEPTOR, useClass: CacheInterceptor }],
})
export class AppModule {}
