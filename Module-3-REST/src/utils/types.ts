export type Authenticated<T> = {
    user: T & { type: 'USER' | 'ADMIN' }
  }