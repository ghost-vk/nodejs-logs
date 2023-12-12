## Смена пароля пользователя default в ClickHouse

По умолчанию пароль не задан. Чтобы задать пароль, нужно обновить файл
`/etc/clickhouse-server/users.xml`.

В секции `<users>` нужно добавить пароль в тег `<password>`:

```xml
<clickhouse>
    <users>
        <default>
            <password>qwerty</password>
        </default>
    </users>
</clickhouse>
```
