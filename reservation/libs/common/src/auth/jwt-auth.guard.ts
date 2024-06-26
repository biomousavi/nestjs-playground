import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, map, tap } from 'rxjs/operators';
import { AUTH_SERVICE, ROLES } from '../constants';
import { Reflector } from '@nestjs/core';
import { User } from '../models';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(JwtAuthGuard.name);
  constructor(
    @Inject(AUTH_SERVICE) private readonly authClient: ClientProxy,
    private readonly reflactor: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const jwt =
      context.switchToHttp().getRequest().cookies?.Authentication ||
      context.switchToHttp().getRequest()?.Authentication ||
      context.switchToHttp().getRequest().headers?.Authentication ||
      context.switchToHttp().getRequest().headers?.authentication;

    if (!jwt) return false;

    const roles = this.reflactor.get<ROLES[]>('roles', context.getHandler());

    return this.authClient
      .send<User>('authenticate', { Authentication: jwt })
      .pipe(
        tap((res) => {
          if (Array.isArray(roles)) {
            for (const role in roles) {
              if (!res.roles?.map((role) => role.name).includes(role)) {
                this.logger.error('user does not have valid roles!');
                throw new UnauthorizedException();
              }
            }
          }
          context.switchToHttp().getRequest().user = res;
        }),
        map(() => true),
        catchError((err) => {
          this.logger.error(err);
          return of(false);
        }),
      );
  }
}
