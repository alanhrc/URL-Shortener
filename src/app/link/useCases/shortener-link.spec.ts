import { InMemoryLinkRepository } from '../../../../test/repositories/inMemory/link/in-memory-link.repository'
import { ShortenerLink } from './shortner-link.useCase'

describe('Shortener link useCase', () => {
  it('should be able to short link', async () => {
    const linkRepository = new InMemoryLinkRepository()
    const shortenerLink = new ShortenerLink(linkRepository)

    const link = 'https://www.google.com'
    const { shortURL } = await shortenerLink.execute({ url: link })

    expect(shortURL).toBeTruthy()
  })
})
