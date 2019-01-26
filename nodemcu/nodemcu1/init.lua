-- dofile("led2_control.lua")

file.open("message.json","r")
messagej = file.read()
file.close()
message = sjson.decode(messagej)

--led_of_state

IO_BLINK = 8
TMR_BLINK = 5
gpio.mode(IO_BLINK, gpio.OUTPUT)

blink = nil
tmr.register(TMR_BLINK, 100, tmr.ALARM_AUTO, function()
    gpio.write(IO_BLINK, blink.i % 2)
    tmr.interval(TMR_BLINK, blink[blink.i + 1])
    blink.i = (blink.i + 1) % #blink
end)

function blinking(param)
    if type(param) == 'table' then
        blink = param
        blink.i = 0
        tmr.interval(TMR_BLINK, 1)
        running, _ = tmr.state(TMR_BLINK)
        if running ~= true then
            tmr.start(TMR_BLINK)
        end
    else
        tmr.stop(TMR_BLINK)
        gpio.write(IO_BLINK, param or gpio.LOW)
    end
end
blinking({500, 500})
---------------------------------------------------------------------------------
--connect again while fail to connect
wificonnect_timer = tmr.create()
tmr.register(wificonnect_timer, 5000, 1, function () 
    if (wifi.sta.getip() == nil) then
        print("lost connect,connect againing: 34")
        blinking({300, 300})
        tmr.interval(wificonnect_timer,120000)
        --tmr.stop(wificonnect_timer)
        wifi.setmode(wifi.STATIONAP)
        wifi.ap.config({ssid="led_nodemcu01", pwd="12345678", auth=wifi.WPA2_PSK})
        enduser_setup.manual(true)
        enduser_setup.start(
            function()
                connect_succes()
            end,
            function(err, str)
                print("enduser_err:" .. str)
                enduser_setup.stop()
        end)

    end
end)

---------------------------------------------------------------------------------
--wifi_connect first time after sys start

wifi.setmode(wifi.STATIONAP)
wifi.ap.config({ssid="led_nodemcu01", pwd="12345678", auth=wifi.WPA2_PSK})
function connect_succes()
    print("sta ip 59:", wifi.sta.getip())
    wifi.setmode(wifi.STATION)
    wifi.sta.autoconnect(1)
    tmr.start(wificonnect_timer)
    blinking({2000, 100})
    enduser_setup.stop()
    dofile("led2_control.lua")
end

enduser_setup.manual(true)
print("ap ip:",wifi.ap.getip())
print("ap mac:",wifi.ap.getmac())
print("sta mac:",wifi.sta.getmac())
print("sta ip:",wifi.sta.getip())
wifi_temporary_timer = tmr.create()
tmr.register(wifi_temporary_timer,10000,0,function()
    if wifi.sta.getip() then
        connect_succes()
    else
        enduser_setup.start(
            function()
                connect_succes()
            end,
            function(err, str)
                print("enduser_err:" .. str)
                enduser_setup.stop()
            end)
    end
    tmr.unregister(wifi_temporary_timer)
end)
tmr.start(wifi_temporary_timer)
-----------------------------------------------------------------------------------------
--timing control function
function timing_control(data)
    tcm = data.tcm
    -- for k, v in pairs(tcm) do 
    --     print(k, v)
    -- end
    if (timing_control_timer:state() ~= 1) then
        tmr.start(timing_control_timer)
    end

end

timing_control_timer = tmr.create()
tmr.register(timing_control_timer, 60*1000, tmr.ALARM_AUTO , function ()    
    now_time = string.format("%02d:%02d",sys_time_hour,sys_time_min)    --synthetic rtctime to compare
    -- print("timing_control_timer running")
    --timing setting1
    if (tcm.m0.time == now_time) then
        print("tcm.mo.time is arrvie")
        print(tcm.index[1])
        if(tcm.index[1] == "1") then
            buffer:fill(0,0,0)
            ws2812.write(buffer)
            tcm.index[1] = 0
        elseif(tcm.index[1] == "2") then
            buffer:fill(0,0,0)
            ws2812.write(buffer)
        elseif(tcm.index[1] == "3") then
            print("open")
            buffer:fill(rgb_data.color_g, rgb_data.color_r, rgb_data.color_b);
            ws2812.write(buffer)
            tcm.index[1] = 0
        elseif(tcm.index[1] == "4") then
            buffer:fill(rgb_data.color_g, rgb_data.color_r, rgb_data.color_b);
            ws2812.write(buffer)
        end
    end
    --timing setting2
    if (tcm.m1.time == now_time) then
        print("tcm.m1.time is arrvie")
        if(tcm.index[2] == "1") then
            buffer:fill(0,0,0)
            ws2812.write(buffer)
            tcm.index[2] = 0
        elseif(tcm.index[2] == "2") then
            buffer:fill(0,0,0)
            ws2812.write(buffer)
        elseif(tcm.index[2] == "3") then
            buffer:fill(rgb_data.color_g, rgb_data.color_r, rgb_data.color_b);
            ws2812.write(buffer)
            tcm.index[2] = 0
        elseif(tcm.index[2] == "4") then
            buffer:fill(rgb_data.color_g, rgb_data.color_r, rgb_data.color_b);
            ws2812.write(buffer)
        end
    end
    --timing setting3
    if (tcm.m2.time == now_time) then
        print("tcm.m2.time is arrvie")
        if(tcm.index[3] == "1") then
            buffer:fill(0,0,0)
            ws2812.write(buffer)
            tcm.index[3] = 0
        elseif(tcm.index[3] == "2") then
            buffer:fill(0,0,0)
            ws2812.write(buffer)
        elseif(tcm.index[3] == "3") then
            buffer:fill(rgb_data.color_g, rgb_data.color_r, rgb_data.color_b);
            ws2812.write(buffer)
            tcm.index[3] = 0
        elseif(tcm.index[3] == "4") then
            buffer:fill(rgb_data.color_g, rgb_data.color_r, rgb_data.color_b);
            ws2812.write(buffer)
        end
    end
    --timing setting4
    if (tcm.m3.time == now_time) then
        print("tcm.m3.time is arrvie")
        if(tcm.index[4] == "1") then
            buffer:fill(0,0,0)
            ws2812.write(buffer)
            tcm.index[4] = 0
        elseif(tcm.index[4] == "2") then
            buffer:fill(0,0,0)
            ws2812.write(buffer)
        elseif(tcm.index[4] == "3") then
            buffer:fill(rgb_data.color_g, rgb_data.color_r, rgb_data.color_b);
            ws2812.write(buffer)
            tcm.index[4] = 0
        elseif(tcm.index[4] == "4") then
            buffer:fill(rgb_data.color_g, rgb_data.color_r, rgb_data.color_b);
            ws2812.write(buffer)
        end
    end

end) 
-----------------------------------------------------------------------------------------
--rgb-conrol
rgb_data = {}
rgb_data.color_state = 0
rgb_data.color_r = 0
rgb_data.color_g = 0
rgb_data.color_b = 0

function rgb_control(data)
    rgb_data = sjson.decode(data)
    timing_control(rgb_data)    --timing control function:92
    for k, v in pairs(rgb_data) do 
        print(k, v)
    end
    ws_R = rgb_data.color_r
    ws_G = rgb_data.color_g
    ws_B = rgb_data.color_b
    if(rgb_data.color_state == "1") then
        print("1:190")
        buffer:fill(rgb_data.color_g, rgb_data.color_r, rgb_data.color_b)
    else
        print("0:193")
        buffer:fill(0,0,0)
    end
    ws2812.write(buffer)
end
----------------------------------------------------------------------------------------

----------------------------------------------------------------------------------------
--mqtt connect seng and receive
wifi_led_pin = 5
led_B = 0
connect_mqttserver_state = 0
gpio.mode(wifi_led_pin,gpio.OUTPUT)
gpio.mode(led_B,gpio.OUTPUT)
m1 = mqtt.Client("509113251", 120, "194413", "Vt2rLag7l9LtcqUn7dT87psfxEY=")
--m1.close()

m1:lwt("node_mm", "lwt", 0, 0)

m1:on("offline", function(client)
    print("offline")
end)

m1:on("message", function(client, topic, data)
    print(topic .. ": " .. data)
    if string.find(topic,"/room/led1/ON") then
        rgb_data.color_state = "1"
        buffer:fill(rgb_data.color_g, rgb_data.color_r, rgb_data.color_b);
        ws2812.write(buffer)
    elseif string.find(topic,"/room/led1/OFF") then
        rgb_data.color_state = "0"
        buffer:fill(0,0,0)
        ws2812.write(buffer)
    elseif string.find(topic,"/room/led1/timing1") then --timing control
        timing_control(data)
    elseif string.find(topic,"/room/ws2812/") then --rgb_led control form wx
        rgb_control(data)
    elseif string.find(topic,"/room/led2") then --/room/led2 control form wx
        led2_control(data)
    elseif string.find(topic,"$creq") then
        if string.find(data,"ledR:") then
            local i = string.byte(data,string.find(data,"}")+1)-48
            gpio.write(wifi_led_pin,i)
        end
        if string.find(data,"ledB:") then
            local i = string.byte(data,string.find(data,"}")+1)-48
            gpio.write(led_B,i)
        end
        if string.find(data,"ws2812_") then
            if string.find(data,"R:") then
                local i = string.find(data,":")
                local j = string.find(data,"}")
                local x = string.sub(data,i+1,j-1)
                ws_R = tonumber(x)
            end
            if string.find(data,"G:") then
                local i = string.find(data,":")
                local j = string.find(data,"}")
                local x = string.sub(data,i+1,j-1)
                ws_G = tonumber(x)
            end
            if string.find(data,"B:") then
                local i = string.find(data,":")
                local j = string.find(data,"}")
                local x = string.sub(data,i+1,j-1)
                ws_B = tonumber(x)
            end
            buffer:fill(ws_G, ws_R, ws_B);
            ws2812.write(buffer)
        end
    end
end)
--mqtt_connect_state as a alarm check whether or not connect to mqtt server
mqtt_connect_state = tmr.create()
tmr.register(mqtt_connect_state,30 * 1000,tmr.ALARM_AUTO,function()
    if (m1:publish("node_mm", "online", 0, 0) ~= true) then
        do_mqtt_connect()
        tmr.stop(mqtt_connect_state)
    end
end)
---------
--m1:connect("183.230.40.39", 6002)
function connect_success(client)
    tmr.start(mqtt_connect_state)   --start the alarm to check mqtt connect state,when connect to mqtt server success
    m1:publish("node_mm", "online", 0, 0)
    m1:subscribe("/room/led1/ON",0,function()
        print("subscreibe /room/led1/ON success:294")
    end)
    m1:subscribe("/room/led1/OFF",0,function()
        print("subscreibe /room/led1/OFF success:297")
    end)
    m1:subscribe("/room/led1/timing1",0,function()
        print("subscreibe /room/led1/timing1 success:300")
    end)
    m1:subscribe("/room/ws2812/r",0,function()
        print("subscreibe /room/ws2812/r success:303")
    end)
    m1:subscribe("/room/led2",0,function()
        print("subscreibe /room/led2 success:306")
    end)
    dofile("time_get.lua")
    blinking({2000, 200})
    connect_mqttserver_state = 1
end

function handle_mqtt_error(client, reason) 
  tmr.create():alarm(10 * 1000, tmr.ALARM_SINGLE, do_mqtt_connect)
end

function do_mqtt_connect()
    connect_mqttserver_state = 0
    blinking({2000, 2000})
    print("connect to mqtt server again 200")
    m1:connect("183.230.40.39", 6002,connect_success,handle_mqtt_error)
end
do_mqtt_connect()
--tmr.alarm(1,1000,1,function() m1:publish("node_mm", "online", 0, 0) end)
--tmr.alarm(1,1100,1,function() m1:publish("$dp", "oe", 0, 0) end)
--------------------------------------------------
--seng nodemcu data flow states to onenet
function onenetstr(json)           
    buf = {}
    buf[0] = 0x03 -- Byte1 Type=3
    jsonlength = string.len(json)
    buf[1] = bit.rshift(bit.band(jsonlength, 0xFF00), 8) 
    buf[2] = bit.band(jsonlength, 0xFF) + 1 
    return string.char(buf[0])..string.char(buf[1])..string.char(buf[2])..json.."\r" 
end

upload_onenet_data = {}
upload_onenet_data.ledR = 3
upload_onenet_data.ledB = 0
tcm = {}
array = {"无操作","关闭一次","连续关闭","开启一次","连续开启"}
tcm.array = array


--update the sensor's message
function upload_data()
    upload_onenet_data.ledR = gpio.read(wifi_led_pin)
    upload_onenet_data.ledB = gpio.read(led_B)
    upload_onenet_data.ws2812_state = rgb_data.color_state
    upload_onenet_data.ws2812_R = ws_R
    upload_onenet_data.ws2812_G = ws_G
    upload_onenet_data.ws2812_B = ws_B
    upload_onenet_data.tcm = tcm                    --updata the timing's message to onenet
    upload_onenet_data.led2 = message.led2
    
    ok, json = pcall(sjson.encode, upload_onenet_data)
    if ok then
        --print("ip187:",wifi.sta.getip())
        --print("connect_mqttserver_state188:",connect_mqttserver_state)
        file.open("message.json","w")       --update message.json's message
        file.write(json)
        file.close()
        m1:publish("$dp",onenetstr(json), 0, 0)
    else
        print("failed to encode json!")
    end
end

---------------------------------------------------------------------------
--ws2812
ws2812.init()
i, buffer = 0, ws2812.newBuffer(8, 3); 
ws_R = 0
ws_G = 0
ws_B = 0
buffer:fill(ws_G, ws_R, ws_B);
ws2812.write(buffer)
--------------------------------------------------------------------------
dht11_pin = 6
local tem_hum_timenumber = 0
local tem_total = 0
local hum_total = 0
local ok_timenumber = 0
function get_dht11_data()
    status, temp, humi, temp_dec, humi_dec = dht.read(dht11_pin)
    if status == dht.OK then
        tem_hum_timenumber = tem_hum_timenumber + 1
        ok_timenumber = ok_timenumber + 1
        if (tem_hum_timenumber == 180) then
                --print("timenumber: ",tem_hum_timenumber,ok_timenumber,tem_total,hum_total)
                tem_hum_timenumber = 0
                upload_onenet_data.temp = tem_total / ok_timenumber
                upload_onenet_data.humi = hum_total / ok_timenumber
                tem_total = 0
                hum_total = 0
                ok_timenumber = 0
        else
                tem_total = tem_total + temp
                hum_total = hum_total + humi
                upload_onenet_data.temp = nil
                upload_onenet_data.humi = nil
        end
    
    elseif status == dht.ERROR_CHECKSUM then
        print( "DHT Checksum error." )
    elseif status == dht.ERROR_TIMEOUT then
        print( "DHT timed out." )
    end
end
---------------------------------------------------------------------------
--check wifi state
net_state_timer = tmr.create()
tmr.register(net_state_timer,1000,tmr.ALARM_AUTO,function()
    if wifi.sta.getip() then
        --print("connect_mqttserver_state228:",connect_mqttserver_state)
        if (connect_mqttserver_state == 1)  then
            get_dht11_data()
            
            --print("upload_data244:")
            upload_data()
        end
    end
end)
tmr.start(net_state_timer)
