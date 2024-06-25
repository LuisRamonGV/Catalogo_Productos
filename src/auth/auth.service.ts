import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  // En un escenario real, esto se manejaría con una base de datos
  private readonly users = [
    {
      userId: 1,
      username: 'admin',
      password: '$2a$10$sh/8iz/Qa0OWYrRASs.1beQ8f3TVf8Uf2aIwjs/.1B8F6eh4X3Q8a', // bcrypt hash for 'password'
      role: 'admin',
    },
    {
      userId: 2,
      username: 'user',
      password: '$2a$10$LdKQ9N1Hoy5QJoGKV.mEB.aQ8P94uPsZ5bSQJ2dH31Tt8U9syfO3C', // bcrypt hash for 'password'
      role: 'user',
    },
  ];

  constructor(private readonly jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = this.users.find(u => u.username === username);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
