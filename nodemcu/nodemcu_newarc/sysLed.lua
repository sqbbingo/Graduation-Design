--sys led state
-- sysLedPin = 5
sysLedState = 0
pwm.setup(5,1000,message.sysLed.brightness*10)
pwm.start(5)
--init sys led flashing begin time
sysLedTimer = tmr.create()
tmr.register(sysLedTimer, message.sysLed.time, tmr.ALARM_AUTO, function()
    sysLedState = not(sysLedState)
    if (sysLedState) then
        pwm.start(5)
    else
        pwm.stop(5)
    end
end)

function sysLedStart()
    tmr.start(sysLedTimer)
    pwm.start(5)
end

function sysLedStop()
    tmr.stop(sysLedTimer)
    pwm.stop(5)
end

function sysFlashingTime(time)
    tmr.interval(sysLedTimer,time)
end

--do when the system access to electricity
if (message.sysLed.state) then
    sysLedStart()
else
    sysLedStop()
end

