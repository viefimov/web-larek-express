class NotFoundError extends Error {
  public statusCode: number;

  constructor(message = 'Ресурс не найден') {
    super(message);
    this.statusCode = 404;
  }
}

export default NotFoundError;
