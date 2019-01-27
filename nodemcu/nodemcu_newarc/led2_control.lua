--led2 control code
led2_pin = 5
pwm.setup(led2_pin,1000,512)
pwm.start(led2_pin)

--The function adjust the led2's brightness 
function led2_brightness_change(brightness_value)
    pwm.setduty(led2_pin, brightness_value)
end

--The function of open led2 
function led2_ON()
    print("led2_ON")
    -- pwm.start(led2_pin)
    print(led2_data.brightness)
    led2_brightness_change(led2_data.brightness+0)
    
end

--The function of close led2
function led2_OFF()
    print("led2_OFF")
    -- pwm.stop(led2_pin)
    print(led2_data.brightness-led2_data.brightness)
    led2_brightness_change(led2_data.brightness-led2_data.brightness);
    
end

--The function of perform the message receive
function led2_control(data)
    local led2_data = sjson.decode(data).led2         --conversion the receive json message to table
    message.led2 = led2_data
    for k,v in pairs(led2_data) do
        print(k,v)
    end

    if (led2_data.state == 1) then            --change led2's state
        pwm.start(led2_pin);
        -- pwm.start(led2_pin);
    else
        pwm.stop(led2_pin);
        -- pwm.stop(led2_pin);
        -- led2_brightness_change(0);
    end

    led2_brightness_change(led2_data.brightness+0)
end
