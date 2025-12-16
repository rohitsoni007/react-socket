type LogLevel = 'silent' | 'error' | 'warn' | 'info' | 'debug';

interface ILogger {
  error?(message: string, ...args: any[]): void;
  warn?(message: string, ...args: any[]): void;
  info?(message: string, ...args: any[]): void;
  debug?(message: string, ...args: any[]): void;
}

// Default console logger
const defaultLogger: ILogger = {
  error: console.error,
  warn: console.warn,
  info: console.info,
  debug: console.debug,
};

// Current log level
let currentLogLevel: LogLevel = 'info';

// Custom logger instance
let customLogger: ILogger | undefined;

/**
 * Set the current log level
 * @param level The log level to set
 */
export const setLogLevel = (level: LogLevel) => {
  currentLogLevel = level;
};

/**
 * Set a custom logger
 * @param logger The custom logger to use
 */
export const setLogger = (logger: ILogger) => {
  customLogger = logger;
};

/**
 * Log a message at the specified level
 * @param level The log level
 * @param message The message to log
 * @param args Additional arguments to log
 */
export const log = (level: LogLevel, message: string, ...args: any[]) => {
  // Check if logging is enabled for this level
  if (shouldLog(level)) {
    const logger = customLogger || defaultLogger;

    switch (level) {
      case 'error':
        logger.error?.(message, ...args);
        break;
      case 'warn':
        logger.warn?.(message, ...args);
        break;
      case 'info':
        logger.info?.(message, ...args);
        break;
      case 'debug':
        logger.debug?.(message, ...args);
        break;
    }
  }
};

/**
 * Check if a message should be logged based on the current log level
 * @param level The log level to check
 * @returns True if the message should be logged, false otherwise
 */
const shouldLog = (level: LogLevel): boolean => {
  if (currentLogLevel === 'silent') return false;

  const levels: LogLevel[] = ['error', 'warn', 'info', 'debug'];
  const currentLevelIndex = levels.indexOf(currentLogLevel);
  const messageLevelIndex = levels.indexOf(level);

  return messageLevelIndex <= currentLevelIndex;
};

/**
 * Log an error message
 * @param message The message to log
 * @param args Additional arguments to log
 */
export const logError = (message: string, ...args: any[]) => {
  log('error', message, ...args);
};

/**
 * Log a warning message
 * @param message The message to log
 * @param args Additional arguments to log
 */
export const logWarn = (message: string, ...args: any[]) => {
  log('warn', message, ...args);
};

/**
 * Log an info message
 * @param message The message to log
 * @param args Additional arguments to log
 */
export const logInfo = (message: string, ...args: any[]) => {
  log('info', message, ...args);
};

/**
 * Log a debug message
 * @param message The message to log
 * @param args Additional arguments to log
 */
export const logDebug = (message: string, ...args: any[]) => {
  log('debug', message, ...args);
};
