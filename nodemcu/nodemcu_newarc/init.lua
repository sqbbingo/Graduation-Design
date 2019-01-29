dofile("config_message.lua")    --get the glocal var of <<message>> and functon <<update_message()>> 
dofile("sysLed.lua")    --<sysLedStart()>,<sysLedStop()>,<sysFlashingTime(time)> suppost above function
dofile("wifi_connec.lua")   --make connect state var <<connect_state>>,monitoring wifi state and connect angin
dofile("mqtt_connect.lua")    --connect to mqtt breaker
dofile("keyControl.lua")    --control the led2 by hand
dofile("lightControl.lua")  --The code detection light intensity every one minutes
dofile("ws2812Control.lua") --<ws2812_control(data)>
dofile("led2_control.lua")  --<led2_control(data)>
dofile("bodyControl.lua")   -- detection whether has people go through
dofile("voiceControl.lua")  ---- detection voice 