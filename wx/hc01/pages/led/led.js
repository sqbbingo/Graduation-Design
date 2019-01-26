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
                        self.setData({
                                led2_data:res.data.data[7].current_value
                        })
                        if (res.data.data[6].current_value == "1") {
                                self.setData({
                                        ischecked1:true
                                })
                        }else{
                                self.setData({
                                        ischecked1:false
                                })
                        }
                        if (res.data.data[7].current_value.state == "1") {  //led2 switch 状态更新
                                self.setData({
                                        ischecked2:true
                                })
                        }else{
                                self.setData({
                                        ischecked2:false
                                })
                        }    
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
                led2_data:" "
        },
        // 按钮1状态改变
        switch1Change: function(e){
                console.log('switch1 发生 change 事件，携带值为',e.detail.value)
                onenet_post(e.detail.value);
                console.log(e.detail);
                this.setData({
                        var1:e.detail.value?"开":"关",
                        ischecked1:e.detail.value?true:false
                })
        },
        // 按钮2状态改变
        switch2Change: function(e){
                var self = this;
                console.log('switch2 发生 change 事件，携带值为',e.detail.value)
                this.setData({
                        var2:e.detail.value?"开":"关",
                        ischecked2:e.detail.value?true:false,
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

//向onenet发送post请求
var onenet_post = function(state){
        var state1 = "OFF";
        if (state) 
        {
                state1 = "ON";
        }
        wx.request({
                        method:'POST',
                        url:'https://api.heclouds.com/mqtt?topic=/room/led1/' + state1,         //服务器地址
                        data: {
                                "state":state1
                        },
                        header: config.config.header,
                        success: function(res) {        //调用成功后的回调函数
                        }
                })
} 
