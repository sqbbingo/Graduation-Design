-- detection whether has people go through -used in inin.lua
bodyTimer = tmr.create()
tmr.register(bodyTimer, 25000, tmr.ALARM_SEMI, function()
    tmr.stop(bodyTimer)
    if(gpio.read(bodyPin) == 0) then
        print("no body")
        --res state after a little time
        if (message.led2.state == 1) then   --restore led2's state
            led2_ON();
        else
            led2_OFF()
        end
        bodyState = nil
        if (connect_state.mqtt.state == 1) then
            mq1:publish("/room2/body", 0, 0, 0)
        end
    end
end)

function control_body()
    local running,mode = tmr.state(bodyTimer)
    if running then
        tmr.stop(bodyTimer)
        tmr.start(bodyTimer)
    else
        tmr.start(bodyTimer) 
    end
    print("bodyings")
    print(bodyState)
    --doing when get body
    if (bodyState == nil) then
        print(message.light.state)
        if ((message.light.state + 0) == 1) then --while light is low open the led
            print("led2_ONM")
            led2_ONM(100)
        end
        bodyState = 1
        if (connect_state.mqtt.state == 1) then
            mq1:publish("/room2/body", 1, 0, 0)
        end
    end
end

bodyPin = 7 
gpio.mode(bodyPin, gpio.INT)
gpio.trig(bodyPin, "up", function()
    control_body()
end)