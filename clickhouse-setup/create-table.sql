create table default.logs_v1
(
    time    DateTime('Europe/Moscow'),
    container_name LowCardinality(String),
    level LowCardinality(String),
    msg String,
    req_id LowCardinality(String)
)
    ENGINE = MergeTree
        PARTITION BY toYYYYMM(time)
        ORDER BY time;
