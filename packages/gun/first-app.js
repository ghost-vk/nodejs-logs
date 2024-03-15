const { generateAndLogMessage } = require('./logger');

setInterval(generateAndLogMessage, 200);

pino.info('Приложение запущено. Для остановки нажмите Ctrl+C');
