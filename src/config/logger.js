import winston, { transports } from 'winston'
import config from './config.js'

const customLevelOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5
  },
  colors: {
    fatal: 'black',
    error: 'red',
    warning: 'yellow',
    info: 'blue',
    http: 'white',
    debug: 'green'
  }
}

const loggerDev = winston.createLogger({
  levels: customLevelOptions.levels,
  transports: [
    new winston.transports.Console(
      {
        level: 'debug',
        format: winston.format.combine(
          winston.format.colorize({ colors: customLevelOptions.colors }),
          winston.format.simple()
        )
      }
    )
  ]
})

const loggerProd = winston.createLogger({
  levels: customLevelOptions.levels,
  transports: [
    new winston.transports.Console(
      {
        level: 'info',
        format: winston.format.combine(
          winston.format.colorize({ colors: customLevelOptions.colors }),
          winston.format.simple()
        )
      }
    ),
    new winston.transports.File(
      {
        filename: './errors.log',
        level: 'error',
        format: winston.format.combine(
          winston.format.colorize({ colors: customLevelOptions.colors }),
          winston.format.simple()
        )
      }
    )
  ]
})

export const addLogger = (req, res, next) => {
  if (config.environment === 'production') {
    req.logger = loggerProd
  } else {
    req.logger = loggerDev
  }
  req.logger.info(`${req.method} in ${req.url} - at ${new Date().toLocaleDateString()} - ${new Date().toLocaleTimeString()}`)
  next()
}