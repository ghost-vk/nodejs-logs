# Логирование Node.js приложений с использованием ClickHouse, Fluentbit, Grafana

В репозитории на примере нескольких Node.js приложений показана настройка
логеров Pino, Winston. Приложения пишут логи в stdout. Драйвером выступает
fluentd; fluent-bit парсит логи и передает в ClickHouse. Визуализация
осуществляется в Grafana.

![](./docs/logs.png)

**Приложения**

- [Express (Pino)](./packages/express)
- [Nest (Pino)](./packages/nest)
- [Strapi (Winston)](./packages/strapi)

В пакете [packages/gun](./packages/gun) имплементирована пушка запросов,
написана на Node.js. Она отправляет запросы в указанные выше приложения.

Все приложения и пушка поднимаются в Docker.

## Содержание

- [Демонстрационный запуск](#демонстрационный-запуск)
  - [1. Подготавливаем ClickHouse](#1-подготавливаем-clickhouse)
  - [2. Запускаем fluent-bit](#2-запускаем-fluent-bit)
  - [3. Подключаем Grafana к ClickHouse](#3-подключаем-grafana-к-clickhouse)
  - [4. Запускаем приложения и пушку](#4-запускаем-приложения-и-пушку)
- [Форма лога](#форма-лога)

## Демонстрационный запуск

### 1. Подготавливаем ClickHouse

Для запуска демонстрации надо подготовить ClickHouse.

Сначала запустим контейнер:

```shell
docker compose up -d clickhouse
```

- Автоматически будет создана таблица `logs` в БД `default`. Таблица определена
  в [этом
  файле](./clickhouse/config/docker-entrypoint-initdb.d/create-logs-table.sql).
- Автоматически будет создан пользователь `default` с паролем `qwerty`.

### 2. Запускаем fluent-bit

До запуска пушки должен уже быть запущен fluent-bit

```sh
docker compose up -d fluent-bit
```

### 3. Подключаем Grafana к ClickHouse

Чтобы подключиться к Clickhouse из Grafana воспользуйтесь документацией:
[Connecting Grafana to
Clickhouse](https://clickhouse.com/docs/en/integrations/grafana#4-build-a-dashboard).

В файле [.grafana/logs.json](./.grafana/logs.json) можно найти конфигурацию
дашборда. Там уже определены SQL запросы, переменные и подсветка, достаточно
импортировать дашборд себе.

### 4. Запускаем приложения и пушку

В каждом из приложений есть env переменные определяющие характер логирования.
Достаточно скопировать в каждом из пакетов `example.env` в `docker.env`.

```sh
cp example.env docker.env
```

**Собираем образы**

```sh
docker compose build express gun nest strapi
```

**Запускаем приложения и пушку**

```sh
docker compose up -d express gun nest strapi
```

## Форма лога

Ниже представлена форма лога (TypeScript) с комментариями по некоторым полям.

```ts
type Log = {
  level: 'ERROR' | 'WARN' | 'INFO' | 'DEBUG' | 'TRACE' | 'HTTP';
  message?: string; // Сообщение лога, в fluet-bit трансформируется в msg
  msg?: string; // Сообщение лога
  ctx?: string; // Контекст лога, например PasswordService, ConcurrencyGuard и т.д.
  context?: string; // Контекст лога, например PasswordService, ConcurrencyGuard и т.д.; в fluent-bit трансформируется в ctx
  meta?: Record<string, unknown>; // Мета информация лога, например, объект: { handlerId: '123QXT', desc: 'upload image' }
  req?: {
    id?: string; // Идентификатор запроса, пишется через pino-http
    method?: 'POST' | 'GET' | 'PATCH' | 'DELETE'; // и др. методы HTTP запросов
    url?: string;
    query?: string;
    params?: Record<string, string>; // Объект с параметрами запроса
    headers?: Record<string, string>; // Заголовки запроса
  };
  res?: {
    code?: number; // Статус ответа: 200, 301, 400, 500 и т.д
    headers?: string;
    time?: number; // Время ответа в мс
  };
  err?: {
    type?: string;
    message?: string; // В fluent-bit трансформируется err_message -> err_msg
    msg?: string;
    options?: Record<string, unknown>; // контекст ошибки
    name?: string;
  };
};
```
