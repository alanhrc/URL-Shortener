export const schemaUserResponse = {
  user: {
    type: 'object',
    properties: {
      user: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            example: '550e8400-e29b-41d4-a716-446655440000',
          },
        },
      },
    },
  },
  conflict: {
    type: 'object',
    properties: {
      statusCode: { type: 'number', example: 409 },
      message: { type: 'string', example: 'User e-mail already exists' },
    },
  },
}
