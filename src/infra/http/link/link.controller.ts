import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { ShortenerLink } from '@/app/link/useCases/shortner-link.useCase'

import { GenerateHashLinkDto } from './dtos/generete-hash-link.dto'

@ApiTags('Link')
@Controller('links')
export class LinkController {
  constructor(private shortenerLink: ShortenerLink) {}

  @Post('/generate')
  // #region swagger
  @ApiOperation({ summary: 'Generate short link' })
  // #endregion
  async generate(@Body() body: GenerateHashLinkDto) {
    const { link } = body

    const { shortURL } = await this.shortenerLink.execute({
      url: link,
    })

    return { shortURL }
  }
}
