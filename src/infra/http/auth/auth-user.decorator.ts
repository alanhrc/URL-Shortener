import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { UserPayload } from './strategy/jwt.strategy'

export const AuthUser = createParamDecorator(
  (_: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()

    return request.user as UserPayload
  },
)
