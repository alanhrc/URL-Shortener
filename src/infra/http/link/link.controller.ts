import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'

import { FindAllLinksUser } from '@/app/link/useCases/find-all-links-user.useCase'
import { ShortenerLink } from '@/app/link/useCases/shortner-link.useCase'
import { UpdateLink } from '@/app/link/useCases/update-link.useCase'

import { GenerateHashLinkDto } from './dtos/generete-hash-link.dto'
import { UpdateLinkDto } from './dtos/update-link.dt'
import { LinkViewModel } from './view-models/link-view-model'

@ApiTags('Link')
@Controller('links')
export class LinkController {
  constructor(
    private shortenerLink: ShortenerLink,
    private findAllLinksUser: FindAllLinksUser,
    private updateLink: UpdateLink,
  ) {}

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

  @Get()
  // #region swagger
  @ApiOperation({ summary: 'Gel all links user' })
  // #endregion
  async findAll() {
    const userId = '63f0bc8a-3883-45b6-968d-dde36aa9d6b3'
    const { links } = await this.findAllLinksUser.execute({ userId })

    return { links: links.map(LinkViewModel.toHTTP) }
  }

  @Put('/update/:linkId')
  // #region swagger
  @ApiOperation({ summary: 'Update link info' })
  // #endregion
  async updateLinkURL(
    @Param('linkId') linkId: string,
    @Body() body: UpdateLinkDto,
  ) {
    await this.updateLink.execute({
      linkId,
      urlOrigin: body.urlOrigin,
    })
  }
}
