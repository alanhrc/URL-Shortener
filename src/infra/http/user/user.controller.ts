import { Body, Controller, Post } from '@nestjs/common'
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'

import { CreateUser } from '@/app/user/useCases/create-user.useCase'

import { CreateUserDto } from './dtos/create-user.dto'
import { schemaUserResponse } from './user.swagger'
import { UserViewModel } from './view-models/user-view-model'

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private createUser: CreateUser) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiCreatedResponse({
    description: 'User info',
    schema: schemaUserResponse.successCreated,
  })
  @ApiConflictResponse({
    description: 'User e-mail already exists',
    schema: schemaUserResponse.conflict,
  })
  async create(@Body() body: CreateUserDto) {
    const { name, email, password } = body

    const { user } = await this.createUser.execute({
      name,
      email,
      password,
    })

    return {
      user: UserViewModel.toHTTP(user),
    }
  }
}
