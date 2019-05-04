--seng nodemcu data flow states to onenet
function onenetstr(json)           
    buf = {}
    buf[0] = 0x03 -- Byte1 Type=3
    jsonlength = string.len(json)
    buf[1] = bit.rshift(bit.band(jsonlength, 0xFF00), 8) 
    buf[2] = bit.band(jsonlength, 0xFF) + 1 
    return string.char(buf[0])..string.char(buf[1])..string.char(buf[2])..json.."\r" 
end

--update the sensor's message
function upload_data()   
    ok, json = pcall(sjson.encode,message)
    if ok then
        file.open("message.config","w")       --update message.json's message
        file.write(json)
        file.close()
        mq1:publish("$dp",onenetstr(json), 0, 0)
    else
        print("failed to encode json!")
    end
end

--publish message
function publish(ftheme,fmessage)
    mq1:publish(ftheme,fmessage, 0, 0)
end

upload_data()
--check wifi state
mqttSendTimer = tmr.create()
tmr.register(mqttSendTimer,1000,tmr.ALARM_AUTO,function()
    if wifi.sta.getip() then
        upload_data()
    end
end)
tmr.stop(mqttSendTimer)