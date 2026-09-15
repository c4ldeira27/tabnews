export class InternalServerError extends Error {
  constructor({ cause }) {
    super("A unexpected error happened", {
      cause: cause,
    });
    this.name = "Internal Server Error";
    this.action = "Entre em contato com o suporte";
    this.status = 500;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status: this.status,
    };
  }
}
