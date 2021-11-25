module.exports = {
  NODE_ENV: "production",
  PORT: 3000,
  MAX_FILE_SIZE_MB: 15,
  RATE_LIMIT_WINDOWS_MS: 60000, //1 minute
  RATE_LIMIT_MAX: 450, // 450 req per minute
  RATE_LIMIT_MESSAGE:
    "Слишком много запросов из вашего IP, повторите через минуту",
  COOKIE_EXPIRE_MS: 604800000,
  CORS_ORIGIN: "http://localhost:3000",
  CORS: "false",
  DATABASE: {
    USER: "project_user",
    PASSWORD: "12345",
    AVNProg: "123",
    SERVER: "localhost",
 
    NAME: "AVN",
    REQUESTTIMEOUT: 30000, //30 sec
    ENCRYPT: false,
    STREAM: false,
  },
};