import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'

import { FindAllLinksUser } from '@/app/link/useCases/find-all-links-user.useCase'
import { ShortenerLink } from '@/app/link/useCases/shortner-link.useCase'
import { UpdateLink } from '@/app/link/useCases/update-link.useCase'

import { AuthGuard, RequestWithUser } from '../auth/guards/auth.guard'
import { OptionalAuthGuard } from '../auth/guards/opcional-auth.guard'
import { GenerateHashLinkDto } from './dtos/generete-hash-link.dto'
import { UpdateLinkDto } from './dtos/update-link.dt'
import { schemaLinkResponse } from './link.swagger'
import { LinkViewModel } from './view-models/link-view-model'

@ApiTags('Link')
@Controller('links')
export class LinkController {
  constructor(
    private shortenerLink: ShortenerLink,
    private findAllLinksUser: FindAllLinksUser,
    private updateLink: UpdateLink,
  ) {}

  @UseGuards(OptionalAuthGuard)
  @Post('/generate')
  @ApiOperation({ summary: 'Generate short link' })
  @ApiCreatedResponse({
    description: 'Generate short link',
    schema: schemaLinkResponse.successGenerated,
  })
  @ApiBearerAuth()
  async generate(
    @Req() request: RequestWithUser,
    @Body() body: GenerateHashLinkDto,
  ) {
    const userId = request?.user?.idUsuario || null

    const { link } = body

    const { shortURL } = await this.shortenerLink.execute({
      url: link,
      userId,
    })

    return { short_URL: shortURL }
  }

  @UseGuards(AuthGuard)
  @Get('/all')
  @ApiOperation({ summary: 'Get all links for user' })
  @ApiOkResponse({
    description: 'Success get array links',
    schema: schemaLinkResponse.successGetLinks,
  })
  @ApiForbiddenResponse({
    description: 'Forbidden resource',
    schema: schemaLinkResponse.forbiddenGetLinks,
  })
  @ApiBearerAuth()
  async findAll(@Req() request: RequestWithUser) {
    const userId = request.user.idUsuario

    const { links } = await this.findAllLinksUser.execute({ userId })

    return { links: links.map(LinkViewModel.toHTTP) }
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  @Put('/update/:link_id')
  @ApiOperation({ summary: 'Update link info' })
  @ApiNoContentResponse({
    description: 'Link updated',
  })
  @ApiBearerAuth()
  async updateLinkURL(
    @Req() request: RequestWithUser,
    @Param('link_id') link_id: string,
    @Body() body: UpdateLinkDto,
  ) {
    const userId = request.user.idUsuario

    await this.updateLink.execute({
      linkId: link_id,
      urlOrigin: body.origin_url,
      userId,
    })
  }
}
