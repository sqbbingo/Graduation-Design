var config = require('../../config.js');        //导入配置文件

Page({
        data:{
                color_r: 24,
                color_g: 50,
                color_b: 255
        },

        //确认按钮，更新灯的状态
        button_ok(e) {
                var self = this;
                console.log(config.config.url_send_mqttdata);
                wx.request({
                        method:'POST',
                        url:config.config.url_send_mqttdata +　'ws2812_Ｒ',         //服务器地址
                        data: {                                 //请求参数
                                 "color_r":127
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
                console.log(options);
                this.setData({
                        
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