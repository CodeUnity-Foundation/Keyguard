import { createLogger, format, transports } from "winston";

export const logger = createLogger({
  transports: new transports.File({
    filename: "logs/server.log",
    format: format.combine(
      format.timestamp({ format: "MMM-DD-YYYY HH:mm:ss" }),
      format.align(),
      format.printf((info) => {
        if (info.api) {
          return `${info.level}: ${[info.timestamp]}: api: ${info.api}, message: ${info.message}`;
        }
        return `${info.level}: ${[info.timestamp]}: ${info.message}`;
      })
    ),
  }),
});
