import { periodTime, timeNow, __dirname, getExtension } from "../utils.js"
import path from 'path'

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

export const hasProfilePic = (documents) => {
  let imageExtensions = ['.jpg', '.jpeg', '.png']
  
  if (documents && documents.length > 0) {
    const reversedDocuments = documents.slice().reverse()
    for (const doc of reversedDocuments) {
      const extension = getExtension(doc.reference)
      if (imageExtensions.includes(extension)) {
        const fullPath = doc.reference
        const relativePath = path.relative(path.join(__dirname, 'public'), fullPath)
        return `${relativePath}`
      }
    }
  } 
  
  return 'https://i.ibb.co/HHhsxsM/b204f7111f4f039f6f65871b8992fbb3-t.jpg'
}