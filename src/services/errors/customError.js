// export default class CustomError {
//   static createError({ name = 'Error', cause, message, code = 1}) {
//     const error = new Error(message, { cause: new Error(cause) })
//     error.name = name
//     error.code = code
//     throw error
//   }
// }

export default class CustomError {
  static createError({ name = 'Error', cause, message, code = 1 }) {
    const error = new Error(message);
    error.name = name;
    error.cause = cause;
    error.code = code;
    throw error;
  }
}