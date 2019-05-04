--The code detection light intensity every one minutes -used in inin.lua
lightTimer = tmr.create()
-- lightPin = 0
gpio.mode(0, gpio.INPUT)
tmr.register(lightTimer, 10*1000, tmr.ALARM_AUTO, function()
    -- print("gpio.read(0:",gpio.read(0))
    if(gpio.read(0) ~= message.light.state) then
        print("light change")
        message.light.state = gpio.read(0)
        if (connect_state.mqtt.state == 1) then
            print("publish:/room1/light")
            mq1:publish("/room1/light",message.light.state, 0, 0)
            upload_data()
        end
    end
end)
tmr.start(lightTimer)