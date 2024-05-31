import { Controller, Get, Param } from '@nestjs/common'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'

import { ValidateLink } from '@/app/link/useCases/validate-link.useCase'

import { schemaHostResponse } from './host.swagger'

@ApiTags('Host')
@Controller('/')
export class HostController {
  constructor(private validateLink: ValidateLink) {}

  @Get('/:short_link')
  @ApiOperation({ summary: 'Redirect to link' })
  @ApiOkResponse({
    description: 'Host to redirect link',
    schema: schemaHostResponse.success,
  })
  async redirect(@Param('short_link') short_link: string) {
    const link = await this.validateLink.execute({ shortLink: short_link })

    return { original_link: link?.urlOrigin || null }
  }
}
