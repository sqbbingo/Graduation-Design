--ws2812
ws2812.init()
i, rgbBuffer = 0, ws2812.newBuffer(8, 3); 
-- rgbBuffer:fill(message.ws2812.rgb[2], message.ws2812.rgb[1],message.ws2812.rgb[3]);
-- ws2812.write(rgbBuffer)
--close ws2812
function ws2812OFF()
    print("ws2812 OFF")
    rgbBuffer:fill(message.ws2812.rgb[2]-message.ws2812.rgb[2], message.ws2812.rgb[1]-message.ws2812.rgb[1],message.ws2812.rgb[3]-message.ws2812.rgb[3]);
    ws2812.write(rgbBuffer)
    message.ws2812.state = 0
end
--open ws2812
function ws2812ON()
    print("ws2812 ON")
    rgbBuffer:fill(message.ws2812.rgb[2], message.ws2812.rgb[1],message.ws2812.rgb[3]);
    ws2812.write(rgbBuffer)
    message.ws2812.state = 1
end

function ws2812_control(data)
    rgb_data = sjson.decode(data)
    message.ws2812 = rgb_data.message
    -- print(message.ws2812)
    rgb_data = nil
    if (message.ws2812.state == 1) then
        ws2812ON()
    else
        ws2812OFF()
    end
    print(message.ws2812.rgb[1])
    upload_data()   --update the message after receive theme
end

print(message.ws2812.state)
if (message.ws2812.state == 1) then
    ws2812ON()
else
    ws2812OFF()
end

--timing control function
now_time = "00:00"
timing_control_timer = tmr.create()
tmr.register(timing_control_timer, 60*1000, tmr.ALARM_AUTO , function ()    
    now_time = string.format("%02d:%02d",sys_time_hour,sys_time_min)    --synthetic rtctime to compare
    print("timing_control_timer running: "..now_time)
    
    --timing setting1
    if (message.ws2812.time[1] == now_time) then
        print("timing setting1")
        if(message.ws2812.index[1] == "1") then
            ws2812OFF()
            message.ws2812.index[1] = 0
        elseif(message.ws2812.index[1] == "2") then
            ws2812OFF()
        elseif(message.ws2812.index[1] == "3") then
            ws2812ON()
            message.ws2812.index[1] = 0
        elseif(message.ws2812.index[1] == "4") then
            ws2812ON()
        end
    upload_data()   --update the message after receive theme
    end
    --timing setting2
    if (message.ws2812.time[2] == now_time) then
        print("timing setting2")
        if(message.ws2812.index[2] == "1") then
            ws2812OFF()
            message.ws2812.index[2] = 0
        elseif(message.ws2812.index[2] == "2") then
            ws2812OFF()
        elseif(message.ws2812.index[2] == "3") then
            ws2812ON()
            message.ws2812.index[2] = 0
        elseif(message.ws2812.index[2] == "4") then
            ws2812ON()
        end
    upload_data()   --update the message after receive theme
    end
    --timing setting3
    if (message.ws2812.time[3] == now_time) then
        print("timing setting3")
        if(message.ws2812.index[3] == "1") then
            ws2812OFF()
            message.ws2812.index[3] = 0
        elseif(message.ws2812.index[3] == "2") then
            ws2812OFF()
        elseif(message.ws2812.index[3] == "3") then
            ws2812ON()
            message.ws2812.index[3] = 0
        elseif(message.ws2812.index[3] == "4") then
            ws2812ON()
        end
    upload_data()   --update the message after receive theme
    end
    if (message.ws2812.time[4] == now_time) then
        print("timing setting0")
        if(message.ws2812.index[4] == "1") then
            ws2812OFF()
            message.ws2812.index[4] = 0
        elseif(message.ws2812.index[4] == "2") then
            ws2812OFF()
        elseif(message.ws2812.index[4] == "3") then
            ws2812ON()
            message.ws2812.index[4] = 0
        elseif(message.ws2812.index[4] == "4") then
            ws2812ON()
        end
    upload_data()   --update the message after receive theme
    end
    led2TimingTimer()   --led2 timing  control form led2_control.lua
end) 

-- tmr.start(timing_control_timer)