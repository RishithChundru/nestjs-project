import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private users: UsersService, private jwt: JwtService,) {}

  async register(data: any) {
    const existingUser = await this.users.findByEmail(data.email);

    if (existingUser) {
        throw new UnauthorizedException('Email already registered');
    }
    const hashed = await bcrypt.hash(data.password, 10);

    const user= await this.users.create({
      name: data.name,
      email: data.email,
      password: hashed,
      role: data.role || "USER",
    });
    const { password, ...result } = user;
    return result;
  }

  async login(email: string, password: string) {
    
    const user = await this.users.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, email: user.email, role: user.role };

    return {
      access_token: await this.jwt.signAsync(payload),
      role: user.role
    };
  }
}
