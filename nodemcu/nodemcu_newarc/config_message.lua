--get the start message after sys get power and make the <<message> table to used
--check whether the message.config is existe
print("open config_message.lua")
if file.exists("message.config") then
    print("Not the first time used")
else
    fw = file.open("message.config", "w")
    fd = file.open("message.json", "r")

    if fd then
        local result = fd:read()
        if fw then
            fw:write(result)
            fw:close()
            fw = file.open("message.config", "r")
            print(fw:read())
        end
    end
    fd:close()
    fw:close()
    fd = nil
    fw = nil
end
--make the global variable table of <<message>>
file.open("message.config","r")
message = sjson.decode(file.read()) -----here
file.close()

-- print(message.led2.brightness)
--the functon update the global variable message
function update_message()           --functon used by other
    local ok,json = pcall(sjson.encode,message)
    file.open("message.config","w")
    file.write(json)
    file.close()
end

dofile("sysLed.lua")    --<sysLedStart()>,<sysLedStop()>,<sysFlashingTime(time)> suppost above function
dofile("wifi_connec.lua")   --make connect state var <<connect_state>>,monitoring wifi state and connect angin
dofile("mqtt_connect.lua")    --connect to mqtt breaker
dofile("keyControl.lua")    --control the led2 by hand
dofile("lightControl.lua")  --The code detection light intensity every one minutes
dofile("ws2812Control.lua") --<ws2812_control(data)>
dofile("led2_control.lua")  --<led2_control(data)>
dofile("bodyControl.lua")   -- detection whether has people go through
dofile("voiceControl.lua")  -- detection voice 
dofile("dht.lua")   --The code detection humi and tem every three minutes
    