--sys led state
sysLedPin = 8
sysLedState = 0
pwm.setup(sysLedPin,1000,message.sysLed.brightness*10)
pwm.start(sysLedPin)
--init sys led flashing begin time
sysLedTimer = tmr.create()
tmr.register(sysLedTimer, message.sysLed.time, tmr.ALARM_AUTO, function()
    sysLedState = not(sysLedState)
    if (sysLedState) then
        pwm.start(sysLedPin)
    else
        pwm.stop(sysLedPin)
    end
end)

function sysLedStart()
    tmr.start(sysLedTimer)
    pwm.start(sysLedPin)
end

function sysLedStop()
    tmr.stop(sysLedTimer)
    pwm.stop(sysLedPin)
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

