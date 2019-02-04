-- devAddr = 0x90
-- devAddr=bit.rshift(devAddr, 1)
-- print("dev:"..devAddr)
i2c.setup(0, 1, 2, i2c.SLOW) --(0,pinSDA, pinSCL,mode)

function readAllADC() 
    local values = {}
    i2c.start(0)
    i2c.address(0, 72, i2c.TRANSMITTER)
    i2c.write(0, 0x04)
    i2c.stop(0)
    i2c.start(0)
    i2c.address(0, 72, i2c.RECEIVER)

    -- values[1] = i2c.read(0, 5)
    values[2] = i2c.read(0, 1)
    -- values[3] = i2c.read(0, 3)
    -- values[4] = i2c.read(0, 4)
    i2c.stop(0)
    
    -- print(string.byte(values[1]))
    print(string.byte(values[2]))
    -- print(string.byte(values[3]))
    -- print(string.byte(values[4]))
    return values
end
