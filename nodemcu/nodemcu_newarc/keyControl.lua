keyTimer = tmr.create()
-- keyPin = 6
gpio.mode(6, gpio.INT, gpio.PULLUP)
function keyControl()
    gpio.trig(6)
    tmr.alarm(keyTimer, 500, tmr.ALARM_SINGLE, function()
        gpio.trig(6,"low", keyControl)
    end)
    print("int")
    if (message.led2.state == 1) then            --change led2's state
        led2_OFF();
        message.led2.state = 0
    else
        led2_ON()
        message.led2.state = 1
    end
    upload_data()
end
gpio.trig(6, "low", keyControl)