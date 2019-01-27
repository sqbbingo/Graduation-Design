mq1:on("message", function(client, topic, data)
    print(topic .. ": " .. data)
    if string.find(topic,"/room1/ws2812") then --rgb_led control form wx
        ws2812_control(data)
    elseif string.find(topic,"/room1/led2") then --/room1/led1 control form wx
        led2_control(data)
    elseif string.find(topic,"$creq") then
        if string.find(data,"ledR:") then
            local i = string.byte(data,string.find(data,"}")+1)-48
            gpio.write(wifi_led_pin,i)
        end
        if string.find(data,"ledB:") then
            local i = string.byte(data,string.find(data,"}")+1)-48
            gpio.write(led_B,i)
        end
        if string.find(data,"ws2812_") then
            if string.find(data,"R:") then
                local i = string.find(data,":")
                local j = string.find(data,"}")
                local x = string.sub(data,i+1,j-1)
                ws_R = tonumber(x)
            end
            if string.find(data,"G:") then
                local i = string.find(data,":")
                local j = string.find(data,"}")
                local x = string.sub(data,i+1,j-1)
                ws_G = tonumber(x)
            end
            if string.find(data,"B:") then
                local i = string.find(data,":")
                local j = string.find(data,"}")
                local x = string.sub(data,i+1,j-1)
                ws_B = tonumber(x)
            end
            buffer:fill(ws_G, ws_R, ws_B);
            ws2812.write(buffer)
        end
    end
end)