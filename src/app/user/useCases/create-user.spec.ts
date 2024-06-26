import { InMemoryUserRepository } from '../../../../test/repositories/inMemory/user/in-memory-user.repository'
import { UserEmailAlreadyExistsError } from '../erros/user-email-already-exists.error'
import { CreateUser } from './create-user.useCase'
import { FindUserByEmail } from './find-user-by-email.useCase'

describe('Create user useCase', () => {
  it('should be able to create an user', async () => {
    const userRepository = new InMemoryUserRepository()
    const findUserByEmail = new FindUserByEmail(userRepository)
    const createUser = new CreateUser(findUserByEmail, userRepository)

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
    const findUserByEmail = new FindUserByEmail(userRepository)
    const createUser = new CreateUser(findUserByEmail, userRepository)

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
