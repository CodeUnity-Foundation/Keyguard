import { logger } from './logger';
import { INTERNAL_SERVER_ERROR_CODE } from '../constants';

type HandlerFunction<T> = () => Promise<T>;

export const asyncHandler = async <T>(handler: HandlerFunction<T>) => {
  try {
    return await handler();
  } catch (error) {
    logger.error(error);
    return {
      statusCode: INTERNAL_SERVER_ERROR_CODE,
      message: error || 'Internal server error',
    };
  }
};
