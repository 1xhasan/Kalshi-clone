export const PG_ERROR_CODES = {
    UNIQUE_VIOLATION: 'PM101',
    FOREIGN_KEY_VIOLATION: 'PM102',
    NOT_NULL_VIOLATION: 'PM103',
    CHECK_VIOLATION: 'PM104',
    INVALID_TEXT_REPRESENTATION: 'PM104',
    NUMERIC_VALUE_OUT_OF_RANGE: 'PM105',
    DIVISION_BY_ZERO: 'PM106',
    UNDEFINED_TABLE: 'PM107',
    UNDEFINED_COLUMN: 'PM108',
    UNDEFINED_FUNCTION: 'PM109',
    DUPLICATE_TABLE: 'PM110',
    DUPLICATE_DATABASE: 'PM111',
    INVALID_PASSWORD: 'PM112',
    INSUFFICIENT_PRIVILEGE: 'PM113',
    INSUFFICIENT_BALANCE: 'PM114',
  } as const;
  
  export interface DatabaseError extends Error {
    code?: string;
    detail?: string;
    table?: string;
    constraint?: string;
    column?: string;
  }
  
  export const handleDatabaseError = (error: DatabaseError) => {
    const errorCode = error.code;
  
    switch (errorCode) {
      case PG_ERROR_CODES.UNIQUE_VIOLATION:
        return {
          status: 409,
          message: 'Duplicate entry. This record already exists.',
          detail: error.detail,
        };
  
      case PG_ERROR_CODES.FOREIGN_KEY_VIOLATION:
        return {
          status: 400,
          message: 'Invalid reference. The related record does not exist.',
          detail: error.detail,
        };
  
      case PG_ERROR_CODES.NOT_NULL_VIOLATION:
        return {
          status: 400,
          message: `Required field missing: ${error.column || 'unknown'}`,
          detail: error.detail,
        };
  
      case PG_ERROR_CODES.CHECK_VIOLATION:
        return {
          status: 400,
          message: 'Data validation failed. Please check your input.',
          detail: error.detail,
        };
  
      case PG_ERROR_CODES.INVALID_TEXT_REPRESENTATION:
        return {
          status: 400,
          message: 'Invalid data format.',
          detail: error.detail,
        };
  
      case PG_ERROR_CODES.NUMERIC_VALUE_OUT_OF_RANGE:
        return {
          status: 400,
          message: 'Number value is too large or too small.',
          detail: error.detail,
        };
  
      case PG_ERROR_CODES.UNDEFINED_TABLE:
        return {
          status: 500,
          message: 'Database table does not exist.',
          detail: error.detail,
        };
  
      case PG_ERROR_CODES.UNDEFINED_COLUMN:
        return {
          status: 500,
          message: 'Database column does not exist.',
          detail: error.detail,
        };
  
      case PG_ERROR_CODES.INSUFFICIENT_PRIVILEGE:
        return {
          status: 500,
          message: 'Database permission denied.',
          detail: error.detail,
        };
  
      default:
        return {
          status: 500,
          message: 'Database error occurred.',
          detail: process.env.NODE_ENV === 'development' ? error.message : undefined,
        };
    }
  };
  
  export const getConstraintMessage = (constraint?: string): string => {
    const constraintMessages: Record<string, string> = {
      users_email_key: 'Email already registered.',
      users_username_key: 'Username already taken.',
      markets_name_key: 'Market with this name already exists.',
      bets_user_market_unique: 'You have already placed a bet on this market.',
    };
  
    return constraint && constraintMessages[constraint] 
      ? constraintMessages[constraint]
      : 'A database constraint was violated.';
  };