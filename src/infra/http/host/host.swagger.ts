export const schemaHostResponse = {
  success: {
    type: 'object',
    properties: {
      original_link: {
        oneOf: [
          {
            type: 'string',
            example: 'https://www.google.com',
          },
          {
            type: 'null',
          },
        ],
      },
    },
  },
}
