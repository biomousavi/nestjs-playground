import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { UserDocument } from '../models';

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => getCurrentUserContext(context),
);

function getCurrentUserContext(ctx: ExecutionContext): UserDocument {
  return ctx.switchToHttp().getRequest().user;
}
