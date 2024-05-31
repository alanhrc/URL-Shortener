import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class AuthenticateUserDto {
  @ApiProperty({
    required: true,
    description: 'E-mail user',
    example: 'john@doe.com',
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string

  @ApiProperty({
    required: true,
    description: 'Password user',
    example: '123456',
  })
  @IsNotEmpty()
  @IsString()
  password: string
}
