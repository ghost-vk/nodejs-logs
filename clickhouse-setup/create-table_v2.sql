create table default.logs_v2
(
    time    DateTime('Europe/Moscow'),
    container_name LowCardinality(String),
    level LowCardinality(String),
    msg String,
    req_id LowCardinality(String),
    req_method LowCardinality(String),
    req_url LowCardinality(String),
    req_query String,
    req_params String,
    req_headers String,
    res_statusCode LowCardinality(String),
    res_headers String,
    err_type LowCardinality(String),
    err_message String,
    err_stack String,
    err_status UInt8,
    err_name LowCardinality(String),
    responseTime UInt16
)
    ENGINE = MergeTree
        PARTITION BY toYYYYMM(time)
        ORDER BY time;
