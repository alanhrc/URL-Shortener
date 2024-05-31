import { InMemoryUserRepository } from '../../../../test/repositories/inMemory/user/in-memory-user.repository'
import { CreateUser } from './create-user.useCase'
import { UserEmailAlreadyExistsError } from './erros/user-email-already-exists.error'

describe('Create user useCase', () => {
  it('should be able to create an user', async () => {
    const userRepository = new InMemoryUserRepository()
    const createUser = new CreateUser(userRepository)

    const { user } = await createUser.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'hash-example',
    })

    expect(user).toBeTruthy()
    expect(userRepository.users).toHaveLength(1)
    expect(userRepository.users[0]).toStrictEqual(user)
  })

  it('should not be able to create an user with same e-mail', async () => {
    const userRepository = new InMemoryUserRepository()
    const createUser = new CreateUser(userRepository)

    await createUser.execute({
      name: 'John Doe',
      email: 'john@doe.com',
      password: 'hash-example',
    })

    expect(
      createUser.execute({
        name: 'John Doe',
        email: 'john@doe.com',
        password: 'hash-example',
      }),
    ).rejects.toBeInstanceOf(UserEmailAlreadyExistsError)
  })
})
