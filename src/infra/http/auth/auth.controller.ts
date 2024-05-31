import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'

import { AuthenticateUser } from '@/app/auth/useCases/authenticate-user.useCase'

import { AuthUser } from './auth-user.decorator'
import { AuthenticateUserDto } from './dtos/authenticate-user.dto'
import { JwtAuthGuard } from './jwt-auth.guard'
import { UserPayload } from './strategy/jwt.strategy'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authenticateUser: AuthenticateUser) {}

  @Post('/login')
  // #region swagger
  @ApiOperation({ summary: 'Authenticate user' })
  @ApiCreatedResponse({
    description: 'Authenticate user',
    // schema: schemaUserResponse.user,
  })
  // @ApiConflictResponse({
  //   description: 'User e-mail already exists',
  //   schema: schemaUserResponse.conflict,
  // })
  // #endregion
  async login(@Body() body: AuthenticateUserDto) {
    const { email, password } = body

    const { access_token } = await this.authenticateUser.execute({
      email,
      password,
    })

    return {
      access_token,
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/me')
  // #region swagger
  @ApiOperation({ summary: 'Authenticate user' })
  @ApiCreatedResponse({
    description: 'Authenticate user',
    // schema: schemaUserResponse.user,
  })
  // @ApiConflictResponse({
  //   description: 'User e-mail already exists',
  //   schema: schemaUserResponse.conflict,
  // })
  @ApiBearerAuth()
  // #endregion
  async me(@AuthUser() user: UserPayload) {
    return {
      user,
    }
  }
}
