import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/interface/user.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  async register(user: User) {
    const matchedUser = await this.userService.findUserByUsername(
      user.username,
    );
    if (matchedUser) {
      throw new ForbiddenException('Username already exists');
    }
    return this.userService.createUser(user.username, user.password);
  }

  async login(user: User) {
    const matchedUser = await this.userService.findUserByUsername(
      user.username,
    );
    if (
      !matchedUser ||
      !(await bcrypt.compare(user.password, matchedUser.password))
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: matchedUser.username, sub: matchedUser._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
