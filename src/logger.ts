// For more information about this file see https://dove.feathersjs.com/guides/cli/logging.html
import { createLogger, format, transports } from 'winston'
import path from 'path'
// Configure the Winston logger. For the complete documentation see https://github.com/winstonjs/winston
export const logger = createLogger({
  // To see more detailed errors, change this to 'debug'
  level: 'info',
  format: format.combine(format.colorize(), format.splat(), format.json(), format.simple()),
  transports: [
    new transports.Console(),
    new transports.File({ filename: path.join(__dirname, '../logs/error.log'), level: 'error' }),
    new transports.File({ filename: path.join(__dirname, '../logs/info.log'), level: 'info' }),
    new transports.File({ filename: path.join(__dirname, '../logs/combined.log') })
  ]
})
