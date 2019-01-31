--The code detection light intensity every one minutes -used in inin.lua
lightTimer = tmr.create()
lightPin = 0
gpio.mode(lightPin, gpio.INPUT)
tmr.register(lightTimer, 10*1000, tmr.ALARM_AUTO, function()
    -- print("gpio.read(lightPin:",gpio.read(lightPin))
    if(gpio.read(lightPin) ~= message.light.state) then
        print("light change")
        message.light.state = gpio.read(lightPin)
        if (connect_state.mqtt.state == 1) then
            upload_data()
        end
    end
end)
tmr.start(lightTimer)