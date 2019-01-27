--led2 control code
led2_pin = 5
pwm.setup(led2_pin,1000,message.led2.brightness)
pwm.start(led2_pin)

--The function of open led2 
function led2_ON()
    print("led2_ON")
    pwm.setduty(led2_pin,10*(message.led2.brightness+0))
    
end

--The function of close led2
function led2_OFF()
    print("led2_OFF")
    pwm.setduty(led2_pin,10*(message.led2.brightness - message.led2.brightness + 0))
    
end

--The function of perform the message receive
function led2_control(data)
    led2_data = sjson.decode(data)         --conversion the receive json message to table
    message.led2 = led2_data.message
    led2_data = nil

    if (message.led2.state == 1) then            --change led2's state
        led2_ON();
    else
        led2_OFF()
    end
    upload_data()
end


--led2 Timing control function
function led2TimingTimer()
    --led2 Timing setting1
    if (message.led2.time[1] == now_time) then
        print("led2 Timing setting1")
        if(message.led2.index[1] == "1") then
            led2_OFF()
            message.led2.index[1] = 0
        elseif(message.led2.index[1] == "2") then
            led2_OFF()
        elseif(message.led2.index[1] == "3") then
            led2_ON()
            message.led2.index[1] = 0
        elseif(message.led2.index[1] == "4") then
            led2_ON()
        end
    upload_data()   --update the message after receive theme
    end
    --led2 Timing setting2
    if (message.led2.time[2] == now_time) then
        print("led2 Timing setting2")
        if(message.led2.index[2] == "1") then
            led2_OFF()
            message.led2.index[2] = 0
        elseif(message.led2.index[2] == "2") then
            led2_OFF()
        elseif(message.led2.index[2] == "3") then
            led2_ON()
            message.led2.index[2] = 0
        elseif(message.led2.index[2] == "4") then
            led2_ON()
        end
    upload_data()   --update the message after receive theme
    end
    --led2 Timing setting3
    if (message.led2.time[3] == now_time) then
        print("led2 Timing setting3")
        if(message.led2.index[3] == "1") then
            led2_OFF()
            message.led2.index[3] = 0
        elseif(message.led2.index[3] == "2") then
            led2_OFF()
        elseif(message.led2.index[3] == "3") then
            led2_ON()
            message.led2.index[3] = 0
        elseif(message.led2.index[3] == "4") then
            led2_ON()
        end
    upload_data()   --update the message after receive theme
    end
    if (message.led2.time[4] == now_time) then
        print("led2 Timing setting0")
        if(message.led2.index[4] == "1") then
            led2_OFF()
            message.led2.index[4] = 0
        elseif(message.led2.index[4] == "2") then
            led2_OFF()
        elseif(message.led2.index[4] == "3") then
            led2_ON()
            message.led2.index[4] = 0
        elseif(message.led2.index[4] == "4") then
            led2_ON()
        end
    upload_data()   --update the message after receive theme
    end
end
