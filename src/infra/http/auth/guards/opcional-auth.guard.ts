import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'

import { validateToken } from '../helpers'

@Injectable()
export class OptionalAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const auth = request.headers.authorization

    if (!auth) {
      request.user = undefined
      return true
    }

    const user = await validateToken(auth)

    if (user) {
      request.user = user as { idUsuario: string; iat: number; exp: number }
    } else {
      request.user = undefined
    }

    return true
  }
}

export type RequestWithUser = Request & {
  user?: { idUsuario: string; iat: number; exp: number }
}
