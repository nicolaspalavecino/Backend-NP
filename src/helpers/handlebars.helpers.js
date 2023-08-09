import { periodTime, timeNow } from "../utils.js"

export const isCreator = (role, options) => {
  if (role === 'admin' || role === 'premium') {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
}

export const isClient = (role, options) => {
  if (role === 'premium' || role === 'user') {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
}

export const isAdmin = (role, options) => {
  if (role === 'admin') {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
}

export const isPremium = (role, options) => {
  if (role === 'premium') {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
}

export const isBasic = (role, options) => {
  if (role === 'user') {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
}

export const isOwner = (email, owner, options) => {
  if (email === owner) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
}

export const isIdle = (last_connection, options) => {
  let period = periodTime(last_connection, timeNow())
  if (period >= 48) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
}