-- gpio.mode(0, gpio.INPUT, gpio.PULLUP)
-- uartState = 0

-- tmr.register(0, 10000, tmr.ALARM_AUTO, function()
--     if(gpio.read(0) == 0) then 
--         if (uartState == 0) then
--             print(gpio.read(0))
--             uartState = 1
--             uart.on("data", function(data)
--                 uart.write(0,"rec:",data)
--                 uart.write(0,"on")
--                 if (string.find(data,"onled")) then
--                     uart.write(0,"开灯")
--                 elseif (string.find(data,"offled")) then
--                     uart.write(0,"关灯")
--                 end
--             end, 0)
--         end
--     else
--         if (uartState == 1) then
--             print(gpio.read(0))
--             uart.on("data")
--             uartState = 0
--         end
--     end
-- end)

gpio.mode(0, gpio.INPUT, gpio.PULLUP)
gpio.mode(0, gpio.OUTPUT)
gpio.mode(2, gpio.OUTPUT)

tmr.alarm(0, 10000, tmr.ALARM_SINGLE, function()
    gpio.write(0, gpio.LOW)
    if(gpio.read(0) == 0) then 
        print("uart on:9600 8-n-1")
        uart.setup(0, 9600, 8, uart.PARITY_NONE, uart.STOPBITS_1, 0)
        uart.on("data","\n", function(data)
            uart.write(0, "rec: ", data)
            if (string.find(data,"onled")) then
                uart.write(0,"onled")
                gpio.write(2,1)
                mq1:publish("/room2/led2", "on", 0, 0)
            end
            if (string.find(data,"offled")) then
                uart.write(0,"offled")
                gpio.write(2,0)
                mq1:publish("/room2/led2", "off", 0, 0)
            end
        end, 0)
    else
        print("print:9600 8-n-1")
        uart.setup(0, 9600, 8, uart.PARITY_NONE, uart.STOPBITS_1, 1)
        uart.on("data")
    end
end)