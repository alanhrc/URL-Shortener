import { Controller, Get, Param } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { ValidateLink } from '@/app/link/useCases/validate-link.useCase'

@ApiTags('Host')
@Controller('/')
export class HostController {
  constructor(private validateLink: ValidateLink) {}

  @Get('/:shortLink')
  // #region swagger
  @ApiOperation({ summary: 'Redirect by link' })
  // #endregion
  async redirect(@Param('shortLink') shortLink: string) {
    const link = await this.validateLink.execute({ shortLink })

    return { origin_link: link?.urlOrigin }
  }
}
