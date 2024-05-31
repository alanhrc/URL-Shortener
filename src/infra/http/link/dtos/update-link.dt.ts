import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateLinkDto {
  @ApiProperty({
    required: true,
    description: 'Link original',
    example: 'https://www.google.com',
  })
  @IsNotEmpty()
  @IsString()
  origin_url: string
}
