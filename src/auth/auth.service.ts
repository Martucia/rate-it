import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { IUser, IUserLogin } from 'src/common/types/types';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string) {
        const user = await this.usersService.findOne(email);

        if (!user) {
            throw new BadRequestException("User wasn't found");
        }

        const passwordIsMatch = await verify(user.password, password);

        if (passwordIsMatch) {
            return user;
        }

        throw new BadRequestException('User or password are incorrect');
    }

    async login(user: IUser) {
        delete user.password;

        return {
            user, token: this.jwtService.sign({ id: user.id, email: user.email })
        }
    }
}
