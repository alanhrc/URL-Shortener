import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class GenerateHashLinkDto {
  @ApiProperty({
    required: true,
    description: 'Link original',
    example: 'https://www.google.com',
  })
  @IsNotEmpty()
  @IsString()
  link: string
}
