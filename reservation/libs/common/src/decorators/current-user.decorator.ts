import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from '../models';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => getCurrentUserContext(context),
);

function getCurrentUserContext(ctx: ExecutionContext): User {
  return ctx.switchToHttp().getRequest().user;
}
