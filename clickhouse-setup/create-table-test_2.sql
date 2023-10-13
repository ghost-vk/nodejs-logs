create table default.test_2
(
    time DateTime('Europe/Moscow'),
    container_name LowCardinality(String),
    level LowCardinality(String),
    msg  String
)
    engine = MergeTree
        partition by toYYYYMM(time)
        order by time;
