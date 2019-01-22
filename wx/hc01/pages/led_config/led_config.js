var config = require('../../config.js');        //导入配置文件

Page({
        data:{
                color_r: 0,
                color_r_value: 0,
                color_g: 0,
                color_g_value: 0,
                color_b: 0,
                color_b_value: 0,
        },

        //确认按钮，更新灯的状态
        button_ok(e) {
                var self = this;
                
                wx.request({
                        method:'POST',
                        url:config.config.url_send_mqttdata +　'/room/ws2812/r',         //服务器地址
                        data: {                                 //请求参数
                                 "color_r":self.data.color_r,
                                 "color_g":self.data.color_g,
                                 "color_b":self.data.color_b
                        },
                        header: config.config.header,   //请求头部
                        success: function(res) {        //调用成功后的回调函数
                                console.log(res);    
                        }
                })

                wx.navigateTo({
                        url: '/pages/led/led',
                })              //跳转到led界面
        },
        button_cancel(e) {
                wx.navigateTo({
                        url: '/pages/led/led',
                })              //跳转到led界面
        },

        // 改变RGB-R的值
        sliderRchange(e) {
                console.log(e);
                this.setData({
                        color_r:e.detail.value
                })
        },
        // 改变RGB-B的值
        sliderGchange(e) {
                console.log(e);
                this.setData({
                        color_g:e.detail.value
                })
        },
        // 改变RGB-B的值
        sliderBchange(e) {
                console.log(e);
                this.setData({
                        color_b:e.detail.value
                })
        },
        onLoad:function(options){
                var self = this;
                //设备各模块状态查询
                wx.request({
                        url:'https://api.heclouds.com/devices/' + config.config.deviceid + '/datastreams',
                        data:{},
                        header: config.config.header,   //请求头部
                        success: function(res) {        //调用成功后的回调函数
                                console.log(res.data.data);
                                console.log(res.data.data.length);
                                for (var i = res.data.data.length - 1; i >= 0; i--) {
                                        if(res.data.data[i].id == "ws2812_R"){
                                                self.setData({
                                                        color_r:res.data.data[i].current_value,
                                                        color_r_value:res.data.data[i].current_value
                                                })
                                                console.log(res.data.data[i].current_value);
                                        }
                                        if(res.data.data[i].id == "ws2812_G"){
                                                self.setData({
                                                        color_g:res.data.data[i].current_value,
                                                        color_g_value:res.data.data[i].current_value
                                                })
                                                console.log(res.data.data[i].current_value);  
                                        }
                                        if(res.data.data[i].id == "ws2812_B"){
                                                self.setData({
                                                        color_b:res.data.data[i].current_value,
                                                        color_b_value:res.data.data[i].current_value
                                                })
                                                console.log(res.data.data[i].current_value);
                                        }
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