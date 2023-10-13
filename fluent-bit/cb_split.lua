function cb_split(tag, timestamp, record)
    if record["log"] ~= nil then
        return 2, timestamp, record["log"]
    else
        return 2, timestamp, record
    end
end
