import { Link } from './link'

describe('Link entity', () => {
  it('should be able to create a link', async () => {
    const link = new Link({
      urlOrigin: 'https://www.google.com',
      urlHash: 'hashl6',
      clicks: 0,
    })

    expect(link).toBeTruthy()
  })
})
