connect_state = {}
connect_state.wifi = {}
connect_state.mqtt = {}
connect_state.mqtt.state = 0
-- connect_state.wifi.numn  = #message.wifi.ssid    --which wifi is connecting
-- connect_state.wifi.numl  = #message.wifi.ssid    --the number of wifi configure message 
wifi.setmode(wifi.STATION)

function listap(t)
    for k,v in pairs(t) do
        print(k.." : "..v)
        if (k == message.wifi.ssid[1]) then
            print("find the wifi")
            station_cfg={} --configure station but don't connect to Access point (DO save config to flash)
            station_cfg.ssid = message.wifi.ssid[1]
            station_cfg.pwd = message.wifi.pwd[1]
            station_cfg.save = true
            wifi.sta.config(station_cfg)
            station_cfg = nil 
            return 1         
        end
    end
    station_cfg={} --configure station but don't connect to Access point (DO save config to flash)
    station_cfg.ssid = "lc"
    station_cfg.pwd = "12345678"
    wifi.sta.config(station_cfg)
    station_cfg = nil   
end

wifi.sta.getap(listap)
wifiStateMonTimer = tmr.create()    --wifi connect state monitoring
tmr.register(wifiStateMonTimer, 30*1000, tmr.ALARM_AUTO , function ()
    if (wifi.sta.getip() == nil) then
        print("Not connect to wifi")
        connect_state.wifi.state = 0    --fail connect to wifi
        -- wifiConnect()
        wifi.sta.getap(listap)
        sysFlashingTime(500)
    else
        connect_state.wifi.state = 1    --fail connect to wifi
        print("Haved connect to wifi")
        sysFlashingTime(1000)
        if (connect_state.mqtt.state == 0) then
            do_mqtt_connect()   --connect to mqtt first
        end
    end
end)
tmr.start(wifiStateMonTimer)  

-- function wifiConnect()  --wifi connect function while lost connect to ap
--     if (wifi.sta.getip() == nil) then
--         connect_state.wifi.state = 1    --wifi's state
--         connect_state.wifi.numn = connect_state.wifi.numn + 1  --which wifi had been connect
--     else
--         if (connect_state.wifi.numn == 0) then
--             connect_state.wifi.numl = #message.wifi.ssid    --update wifi number
--             connect_state.wifi.numn = connect_state.wifi.numl
--         end
        
--         station_cfg={} --configure station but don't connect to Access point (DO save config to flash)
--         station_cfg.ssid = message.wifi.ssid[connect_state.wifi.numn]
--         station_cfg.pwd = message.wifi.pwd[connect_state.wifi.numn]
--         station_cfg.save = true
--         wifi.sta.config(station_cfg)
--         connect_state.wifi.numn = connect_state.wifi.numn - 1
--         print("connecting to "..station_cfg.ssid..":"..station_cfg.pwd)
--         station_cfg = nil
--     end
-- end

function wifi_change(data)
    wifi_data = sjson.decode(data)         --conversion the receive json message to table
    message.wifi = wifi_data.message
    wifi_data = nil
    upload_data()
end

function subscribe_change(data)
    subscribe_data = sjson.decode(data)         --conversion the receive json message to table
    message.mqtt.subscribe = subscribe_data.message
    subscribe_data = nil
    upload_data()
end

