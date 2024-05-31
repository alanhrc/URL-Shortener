import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'

import { validateToken } from '../helpers'

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const auth = request.headers.authorization

    if (!auth) return false

    const user = await validateToken(auth)

    if (!user) return false

    request.user = user as { idUsuario: string; iat: number; exp: number }

    return true
  }
}

export type RequestWithUser = Request & {
  user: { idUsuario: string; iat: number; exp: number }
}
