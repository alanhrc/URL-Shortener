export const schemaLinkResponse = {
  successGenerated: {
    type: 'object',
    properties: {
      short_URL: {
        type: 'string',
        example: 'http://localhost:3333/PE5NI2',
      },
    },
  },
  successGetLinks: {
    type: 'object',
    properties: {
      links: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: 'b6406ac8-0c15-48fb-8811-02db01516f96',
            },
            urlOrigin: {
              type: 'string',
              example: 'https://www.google.com',
            },
            urlHash: {
              type: 'string',
              example: '4uGGRK',
            },
            clicks: {
              type: 'integer',
              example: 0,
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-05-31T14:13:25.126Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-05-31T14:13:25.127Z',
            },
            deletedAt: {
              type: 'string',
              format: 'date-time',
              example: null,
            },
            userId: {
              type: 'string',
              example: '63f0bc8a-3883-45b6-968d-dde36aa9d6b3',
            },
          },
        },
      },
    },
  },
  forbiddenGetLinks: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        example: 'Forbidden resource',
      },
      error: {
        type: 'string',
        example: 'Forbidden',
      },
      statusCode: {
        type: 'number',
        example: 403,
      },
    },
  },
}
