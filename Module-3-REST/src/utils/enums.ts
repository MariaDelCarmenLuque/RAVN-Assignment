
export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

export enum TypeItem {
    POST = 'POST',
    COMMENT = 'COMMENT',
}

export enum PrismaErrorEnum {
    NOT_FOUND = 'P2025', // Record not found
    DUPLICATED = 'P2002', // Unique constraint fails
    FOREIGN_KEY_CONSTRAINT = 'P2003', // Foreign key constraint fails
  }