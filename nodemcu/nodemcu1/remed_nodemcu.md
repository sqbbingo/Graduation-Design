![noemcu_IO](https://github.com/sqbbingo/image/blob/master/grand_desig_image/node%E5%BC%95%E8%84%9A.png)
![esp8266-2_IO](https://github.com/sqbbingo/image/blob/master/grand_desig_image/esp8266_io.png)

# 一、引脚分配情况
|index|PIN|#define|功能|
|:--:|:--:||:--:|:--:|
|8|GIIO15|IO_BLINK|连接状态指示灯|
|5|GPIO14|wifi_led_pin|wifi连接状态指示灯|
|0|GPIO16|led_B|控制用led灯|
|6|GPIO12|dht11_pin|温湿度引脚|
|4|GPIO2|WS2812|ws2812控制引脚|
|3|GPIO0|-|人体红外引脚|

# 二、定时器分配使用情况
|名字|周期|定时时长|用途|
|:-:|:-:|:-:|:-:|
|TMR_BLINK|循环|变化|指示灯状态时长|
|wificonnect_timer|循环|5s|wifi连接检测|
|wifi_temporary_timer|循环|10s|wifi连接|
|timing_control_timer|循环|60s|灯的定时控制|
|mqtt_connect_state|循环|30s|mqtt连接状态|
