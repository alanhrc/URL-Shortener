import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'

import { AuthService } from './auth.service'
import { AuthenticateUserDto } from './dtos/authenticate-user.dto'
import { AuthGuard, RequestWithUser } from './guards/auth.guard'

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: AuthenticateUserDto) {
    return this.authService.login(body)
  }

  @UseGuards(AuthGuard)
  @Get('me')
  @ApiBearerAuth()
  me(@Req() request: RequestWithUser) {
    return this.authService.me(request.user.idUsuario)
  }
}
