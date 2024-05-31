import { HttpException, HttpStatus } from '@nestjs/common'

export class UserEmailAlreadyExistsError extends HttpException {
  constructor() {
    super('User e-mail already exists', HttpStatus.CONFLICT)
  }
}
