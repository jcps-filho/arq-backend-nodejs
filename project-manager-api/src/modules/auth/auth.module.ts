import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { jwtConstants } from './constants';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard/auth-guard.service';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        UsersModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: "60m" },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, AuthGuardService],
})
export class AuthModule { }
