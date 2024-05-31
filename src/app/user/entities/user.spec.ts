import { User } from './user'

describe('User entity', () => {
  it('should be able to create an user', async () => {
    const user = new User({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'hash-example',
    })

    expect(user).toBeTruthy()
  })
})
