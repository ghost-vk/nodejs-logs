CREATE TABLE default.logs
(
    time    DateTime('Europe/Moscow'),
    container_name LowCardinality(String),
    level LowCardinality(String),
    msg String,
    ctx String,
    meta String,
    req_id LowCardinality(String),
    req_method LowCardinality(String),
    req_url LowCardinality(String),
    req_query String,
    req_params String,
    req_headers String,
    res_code UInt16,
    res_headers String,
    res_time UInt16,
    err_type LowCardinality(String),
    err_msg String,
    err_stack String,
    err_status UInt8,
    err_name LowCardinality(String),
)
    ENGINE = MergeTree
        PARTITION BY toYYYYMM(time)
        ORDER BY time;
