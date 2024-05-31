import { InMemoryUserRepository } from '../../../../test/repositories/inMemory/user/in-memory-user.repository'
import { CreateUser } from './create-user.useCase'
import { FindUserByEmail } from './find-user-by-email.useCase'

describe('Find user by email useCase', () => {
  it('should be able to find an user by email', async () => {
    const userRepository = new InMemoryUserRepository()
    const findUserByEmail = new FindUserByEmail(userRepository)
    const createUser = new CreateUser(findUserByEmail, userRepository)

    const { user } = await createUser.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'hash-example',
    })

    const { user: userFound } = await findUserByEmail.execute({
      email: user.email,
    })

    expect(userFound).toBeTruthy()
    expect(userFound?.email).toEqual(user.email)
  })

  it('should not be able to find an user with different e-mail', async () => {
    const userRepository = new InMemoryUserRepository()
    const findUserByEmail = new FindUserByEmail(userRepository)
    const createUser = new CreateUser(findUserByEmail, userRepository)

    await createUser.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'hash-example',
    })

    const { user } = await findUserByEmail.execute({
      email: 'different-email',
    })

    expect(user).toBeNull()
  })
})
