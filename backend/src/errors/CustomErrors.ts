import { GraphQLError } from 'graphql';

export class BaseError extends GraphQLError {
  constructor(message: string, code: string, additionalInfo?: Record<string, any>) {
    super(message, {
      extensions: {
        code,
        ...additionalInfo,
      },
    });
  }
}

export class ValidationError extends BaseError {
  constructor(message = 'Validation error', details?: Record<string, any>) {
    super(message, 'BAD_USER_INPUT', { details });
  }
}

export class AuthenticationError extends BaseError {
  constructor(message = 'Authentication required') {
    super(message, 'UNAUTHENTICATED');
  }
}

export class ForbiddenError extends BaseError {
  constructor(message = 'Access forbidden') {
    super(message, 'FORBIDDEN');
  }
}

export class InternalServerError extends BaseError {
  constructor(message = 'Internal server error') {
    super(message, 'INTERNAL_SERVER_ERROR');
  }
}
