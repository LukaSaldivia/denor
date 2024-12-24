class _Error extends Error {
  constructor(message: string) {
    super(message)
  }
}

class ConnectionError extends _Error {
  // ECONNREFUSED
  constructor(message: string) {
    super(message)
    this.name = 'Connection Error'
  }
}

class UnknownDatabaseError extends _Error {
  // ER_BAD_DB_ERROR
  constructor(message: string) {
    super(message)
    this.name = 'Unknown Database Error'
  }
}

class DeniedAccessDatabaseError extends _Error {
  // ER_ACCESS_DENIED_ERROR
  constructor(message: string) {
    super(message)
    this.name = 'Denied Access Database Error'
  }
}

class DuplicateEntryError extends _Error {
  // ER_DUP_ENTRY
  constructor(message: string) {
    super(message)
    this.name = 'Duplicate Entry Error'
  }
}


export { _Error, ConnectionError, UnknownDatabaseError, DeniedAccessDatabaseError, DuplicateEntryError }