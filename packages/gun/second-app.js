const { faker } = require('@faker-js/faker');
const pino = require('pino')({
  formatters: {
    level: (label) => {
      return { level: label.toUpperCase() };
    },
  },
});

function generateRandomJSON() {
  const randomJSON = {};
  const numPairs = Math.floor(Math.random() * 5) + 1;

  for (let i = 0; i < numPairs; i++) {
    const key = `key${i}`;
    randomJSON[key] = Math.random();
  }

  return randomJSON;
}

function generateAndLogMessage() {
  const x = Math.random();
  let message = faker.lorem.text(10);
  if (x > 0 && x < 0.1) {
    message = JSON.stringify(generateRandomJSON());
  } else if (x >= 0.1 && x < 0.2) {
    message = `${faker.lorem.text(12)}.\nJSON: ${JSON.stringify(generateRandomJSON())}`;
  } else if (x >= 0.2 && x < 0.3) {
    pino.error(message);
  } else if (x >= 0.3 && x < 0.4) {
    pino.fatal(message);
  } else if (x >= 0.4 && x < 0.5) {
    pino.warn(message);
  } else {
    message = faker.lorem.text(12);
  }
  pino.info(`${message}`);
}

setInterval(generateAndLogMessage, 200);

pino.info('Приложение запущено. Для остановки нажмите Ctrl+C');
