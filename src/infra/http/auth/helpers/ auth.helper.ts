import * as jwt from 'jsonwebtoken'

export const validateToken = async (auth: string): Promise<unknown> => {
  const secret = process.env.JWT_SECRET

  try {
    const splittedAuth = auth.split(' ')

    if (splittedAuth[0] !== 'Bearer') return null

    return jwt.verify(splittedAuth[1], `${secret}`)
  } catch {
    return null
  }
}

export const signToken = (user: { idUsuario: string }): string => {
  const secret = process.env.JWT_SECRET

  return jwt.sign(
    {
      idUsuario: user.idUsuario,
    },
    `${secret}`,
    { expiresIn: '2d' },
  )
}
