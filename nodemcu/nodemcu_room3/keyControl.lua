keyTimer = tmr.create()
keyPin = 6
gpio.mode(keyPin, gpio.INT, gpio.PULLUP)
function keyControl()
    gpio.trig(keyPin)
    tmr.alarm(keyTimer, 500, tmr.ALARM_SINGLE, function()
        gpio.trig(keyPin,"low", keyControl)
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
gpio.trig(keyPin, "low", keyControl)