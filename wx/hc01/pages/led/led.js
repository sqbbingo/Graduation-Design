var config = require('../../config.js');        //导入配置文件

function sys_state_timer_calback(self)
{
        // console.log(config.config.header);
        //设备是否在线查询
        wx.request({
                                url:'https://api.heclouds.com/devices' + '?online=true&amp',         //服务器地址
                                data: {},
                                header: config.config.header,   //请求头部
                                success: function(res) {        //调用成功后的回调函数
                                        // console.log(res);
                                        if(res.data.data.devices.length > 0){
                                                self.setData({
                                                        online_state_imag:'/images/online.png',
                                                        online_state_text:"在线"
                                                })
                                        }else{
                                              self.setData({
                                                        online_state_imag:'/images/offline.png',
                                                        online_state_text:"离线"
                                                })  
                                        }
                                        
                                }
                        })
        //设备各模块状态查询
        wx.request({
                url:'https://api.heclouds.com/devices/' + config.config.deviceid + '/datastreams',
                data:{},
                header: config.config.header,   //请求头部
                success: function(res) {        //调用成功后的回调函数
                        console.log(res);
                        for (var i = res.data.data.length - 1; i >= 0; i--) {
                               if (res.data.data[i].id == "sysLed"){
                                    self.setData({
                                            'message.sysLed':res.data.data[i].current_value
                                    })
                               }else if (res.data.data[i].id == "led2") {
                                    self.setData({
                                            'message.led2':res.data.data[i].current_value
                                    })
                               }else if (res.data.data[i].id == "mqtt") {
                                    self.setData({
                                            'message.mqtt':res.data.data[i].current_value
                                    })
                               }else if (res.data.data[i].id == "wifi") {
                                    self.setData({
                                            'message.wifi':res.data.data[i].current_value
                                    })
                               }else if (res.data.data[i].id == "ws2812") {
                                    self.setData({
                                            'message.ws2812':res.data.data[i].current_value
                                    })
                               }
                           } 
                        if (res.data.data[6].current_value == "1") {
                                self.setData({
                                        ischecked1:true
                                })
                        }else{
                                self.setData({
                                        ischecked1:false
                                })
                        }
                        // if (res.data.data[7].current_value.state == "1") {  //led2 switch 状态更新
                        //         self.setData({
                        //                 ischecked2:true
                        //         })
                        // }else{
                        //         self.setData({
                        //                 ischecked2:false
                        //         })
                        // }    
                }
        })
}

Page({
        data:{
                var1:"开",
                ischecked1:false,
                led1_state:"大厅全彩灯",

                var2:"关",
                ischecked2:false,
                led2_state:"大厅普通灯",
                online_state_imag:'/images/offline.png',
                online_state_text:"离线",
                led2_data:" ",

                message:{
                        wifi:{
                            ssid:["wf","nodemcu"],
                            pwd:["su666688886","12345678"]
                        },
                        sysLed:{
                            state:1,
                            time:500,
                            brightness:50
                        },
                        mqtt:{
                            productId:"194413",
                            apiKey:"Vt2rLag7l9LtcqUn7dT87psfxEY=",
                            deviceId:"516161018",
                            authInfo:"bs01",
                            subscribe:["sysLed","/room1/ws2812","/room1/led1"]
                        },
                        ws2812:{
                            state:0,
                            rgb:[10,10,10],
                            index:[0,0,0,0,0],
                            time:["00:00","00:00","00:00","00:00","00:00"]
                        },
                        led2:{
                            state:0,
                            brightness:0,
                            index:[0,0,0,0,0],
                            time:["00:00","00:00","00:00","00:00","00:00"]
                        }   
                }
        },
        // 按钮1状态改变
        switch1Change: function(e){
                var self = this;
                console.log('switch1 发生 change 事件，携带值为',e.detail.value)
                console.log(e.detail);
                this.setData({
                        var1:e.detail.value?"开":"关",
                        'message.ws2812.state':e.detail.value?1:0
                })
                config.config.PublishTheme("/room1/ws2812",self.data.message.ws2812);
        },
        // 按钮2状态改变
        switch2Change: function(e){
                var self = this;
                console.log('switch2 发生 change 事件，携带值为',e.detail.value)
                this.setData({
                        var2:e.detail.value?"开":"关",
                        'led2_data.state':e.detail.value?1:0
                })

                wx.request({
                        method:'POST',
                        url:config.config.url_send_mqttdata +　'/room/led2',         //服务器地址
                        data: {                                 //请求参数
                                "led2":self.data.led2_data
                        },
                        header: config.config.header,   //请求头部
                        success: function(res) {        //调用成功后的回调函数
                                console.log(res);    
                        }
                })
        },
        //页面载入
        onLoad:function(options){
                var self = this;
                console.log("加载页面");
                sys_state_timer_calback(self);
                var sys_state_timer = setInterval(sys_state_timer_calback,10000,self); //每10秒查询一次设备的状态
        },
        onReady:function(){
                
        },
        onShow:function(){
                
        },
        onHide:function(){
                
        },
        onUnload:function(){
                
        },
        onPullDownRefresh:function(){
                
        },
        onReachBottom:function(){
                
        }
})

