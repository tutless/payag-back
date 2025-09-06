import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class GqlAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    if (!req || !req.headers) {
      throw new UnauthorizedException('No request context found');
    }

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Missing Authorization header');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Invalid Authorization format');
    }

    try {
      // Example: verify JWT token
      const payload = this.jwtService.verify(token);
      req.user = payload; // attach user to request for later use
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    return true; // allow the request to continue
  }
}
