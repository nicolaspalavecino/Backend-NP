export const isAdmin = (role, options) => {
  if (role === 'admin') {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
}
