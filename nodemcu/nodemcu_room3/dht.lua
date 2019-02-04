--The code detection humi and tem every three minutes -used in inin.lua
dhtTimer = tmr.create()
dhtPin = 2
dhtData = {}
dhtData.num = 0
dhtData.temp = 0
dhtData.humi = 0
tmr.register(dhtTimer, 1000, tmr.ALARM_AUTO, function()
    local status, temp, humi, temp_dec, humi_dec = dht.read(dhtPin)
    if status == dht.OK then
            -- message.dht = {}
            -- message.dht.tem = temp
            -- message.dht.hum = humi
            -- if (connect_state.mqtt.state == 1) then
            --     upload_data()
            -- end
            -- message.dht = nil
        if (dhtData.num > 180) then
            message.dht = {}
            message.dht.tem = dhtData.temp / 180
            message.dht.hum = dhtData.humi / 180
            if (connect_state.mqtt.state == 1) then
                upload_data()
            end
            message.dht = nil
            dhtData.num = 0
            dhtData.temp = 0
            dhtData.humi = 0
        else
            dhtData.num = dhtData.num + 1
            dhtData.temp = dhtData.temp + temp
            dhtData.humi = dhtData.humi + humi
        end
    end
end)
tmr.start(dhtTimer)