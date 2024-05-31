import { HttpException, HttpStatus } from '@nestjs/common'

export class AuthenticateUserError extends HttpException {
  constructor() {
    super('Invalid credentials', HttpStatus.UNAUTHORIZED)
  }
}
