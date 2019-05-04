function isConnect()
    ip, _, _ = wifi.sta.getip()
    if ip ~= nil then
        print(ip)
        return true
    else
        print("without ip:time_get_7")
        return false
    end
end

function refreshTime()
    sec,usec,rate = rtctime.get()
    sys_time = rtctime.epoch2cal(sec+(8*60*60),usec,rate)
    sys_time_hour = sys_time["hour"]
    sys_time_min = sys_time["min"]

end
rtctime.set(1436430589, 0)
stime_timer = tmr.create()
tmr.alarm(stime_timer, 1000, tmr.ALARM_AUTO, function() 
    if isConnect() == true then
        tmr.stop(stime_timer)
        sntp.sync("120.24.166.46", 
            function()
                print("sync succeeded")
                tmr.start(timing_control_timer)
                tmr.alarm(stime_timer, 1000, tmr.ALARM_AUTO, refreshTime)
            end,
            function(index)
                print("failed : "..index)
            end
        )
    end
end)
