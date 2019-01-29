-- detection voice -used in inin.lua
voiceTimer = tmr.create()
tmr.register(voiceTimer, 25000, tmr.ALARM_SEMI, function()
    tmr.stop(voiceTimer)
    if(gpio.read(voicePin) == 0) then
        print("no voice")
        --res state after a little time
        if (message.led2.state == 1) then   --restore led2's state
            led2_ON();
        else
            led2_OFF()
        end
        voiceState = nil
        if (connect_state.mqtt.state == 1) then
            mq1:publish("/room1/voice", "0", 0, 0)
        end
    end
end)


voicePin = 1 
gpio.mode(voicePin, gpio.INT)
gpio.trig(voicePin, "up", function()
    local running,mode = tmr.state(voiceTimer)
    if running then
        tmr.stop(voiceTimer)
        tmr.start(voiceTimer)
    else
        tmr.start(voiceTimer) 
    end
    print("voiceing")
    --doing when get voice
    if (voiceState == nil) then
        if (message.light.state == 1) then --while light is low open the led
            led2_ONM(100)
        end
        voiceState = 1
        if (connect_state.mqtt.state == 1) then
            mq1:publish("/room1/voice", "1", 0, 0)
        end
    end
end)