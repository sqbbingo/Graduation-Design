var config = require('../../config.js');        //导入配置文件

function sys_state_timer_calback(self)
{
        // console.log(self);
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
                        // console.log(res.data.data[0].current_value);
                        if (res.data.data[0].current_value) {
                                self.setData({
                                        ischecked1:true
                                })
                        }else{
                                self.setData({
                                        ischecked1:false
                                })
                        }
                        
                }
        })
}

Page({
        data:{
                var1:"开",
                ischecked1:false,
                led1_state:"大厅",

                var2:"关",
                ischecked2:false,
                led2_state:"厨房",
                online_state_imag:'/images/offline.png',
                online_state_text:"离线"
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
        // 按钮1状态改变
        switch2Change: function(e){
                console.log('switch2 发生 change 事件，携带值为',e.detail.value)
                this.setData({
                        var2:e.detail.value?"开":"关"
                })
        },
        //页面载入
        onLoad:function(options){
                var self = this;
                // console.log(self);
                var sys_state_timer = setInterval(sys_state_timer_calback,10000,self); //每10秒查询一次设备的状态
                wx.request({
                                url:'https://api.heclouds.com/devices' + '?online=true&amp',         //服务器地址
                                data: {},
                                header: config.config.header,   //请求头部
                                success: function(res) {        //调用成功后的回调函数
                                        console.log(res);
                                        if(res.data.data.devices.length > 0){
                                                self.setData({
                                                        online_state_imag:'/images/online.png',
                                                        online_state_text:"在线"
                                                })
                                        }
                                        
                                }
                        })
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
                // this.setData({
                //         ischecked1:true
                // })
        // }else{
        //         this.setData({
        //                 ischecked1:true
        //         })
        }
        wx.request({
                        method:'POST',
                        url:'https://api.heclouds.com/mqtt?topic=/room/led1/' + state1,         //服务器地址
                        data: {"state":state1
                        },
                        header: {
                                'Content-Type': 'application/json',
                                "api-key": "Vt2rLag7l9LtcqUn7dT87psfxEY=",
                                //"Host": "api.heclouds.com"
                        },
                        success: function(res) {        //调用成功后的回调函数
                                // console.log(res);
                                // self.setData({
                                //         // html:res.data.data.id   //更新HTML代码
                                // })
                        }
                })
} 

//向onenet发送get请求
var onenet_get = function(){
        // var self = this;
        // wx.request({
        //                 url:'https://api.heclouds.com/devices' + '?online=true&amp',         //服务器地址
        //                 data: {
        //                 },
        //                 header: {
        //                         'Content-Type': 'application/json',
        //                         "api-key": "Vt2rLag7l9LtcqUn7dT87psfxEY=",
        //                 },
        //                 success: function(res) {        //调用成功后的回调函数
        //                         // if(res.data.data.devices[0].online){
                                        
        //                         // }
        //                         // self.setData({
        //                         //                 online_state_imag:'/images/online.png',
        //                         //                 online_state_text:"在线"
        //                         //         })
        //                 }
        //         })
}               