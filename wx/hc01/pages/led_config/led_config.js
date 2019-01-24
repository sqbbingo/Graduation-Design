var config = require('../../config.js');        //导入配置文件

Page({
        data:{
                color_r: 0,
                color_r_value: 0,
                color_g: 0,
                color_g_value: 0,
                color_b: 0,
                color_b_value: 0,
                select: false,
                tcm:{    //定时开关信息
                        array: ['无操作','关闭一次','连续关闭', '开启一次', '连续开启'],
                        index:[0,0,0,0,0],
                        m0:{
                                state:"ON",
                                time:"00:00"
                        },
                        m1:{
                                state:"ON",
                                time:"00:00"
                        },
                        m2:{
                                state:"ON",
                                time:"00:00"
                        },
                        m3:{
                                state:"ON",
                                time:"00:00"
                        },
                }
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
                                 "color_b":self.data.color_b,
                                 "tcm":self.data.tcm
                                 // {
                                 //    "index":self.data.tcm.index,
                                 //    "m0":self.data.tcm.m0,
                                 //    "m1":self.data.tcm.m1,
                                 //    "m2":self.data.tcm.m2,
                                 //    "m3":self.data.tcm.m3
                                 // }
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

        //取消按钮-直接跳转到主页
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

        //页面加载函数
        onLoad:function(options){
                var self = this;
                //设备各模块状态查询
                wx.request({
                        url:'https://api.heclouds.com/devices/' + config.config.deviceid + '/datastreams',
                        data:{},
                        header: config.config.header,   //请求头部
                        success: function(res) {        //调用成功后的回调函数
                                console.log(res);
                                // console.log(res.data.data.length);

                                // 初始化灯光颜色-将滑块和颜色调节到实际情况
                                for (var i = res.data.data.length - 1; i >= 0; i--) {
                                        if(res.data.data[i].id == "ws2812_R"){  //红光
                                                self.setData({
                                                        color_r:res.data.data[i].current_value,
                                                        color_r_value:res.data.data[i].current_value
                                                })
                                                // console.log(res.data.data[i].current_value);
                                        }
                                        if(res.data.data[i].id == "ws2812_G"){  //绿光
                                                self.setData({
                                                        color_g:res.data.data[i].current_value,
                                                        color_g_value:res.data.data[i].current_value
                                                })
                                                // console.log(res.data.data[i].current_value);  
                                        }
                                        if(res.data.data[i].id == "ws2812_B"){  //蓝光
                                                self.setData({
                                                        color_b:res.data.data[i].current_value,
                                                        color_b_value:res.data.data[i].current_value
                                                })
                                                // console.log(res.data.data[i].current_value);
                                        }
                                        if (res.data.data[i].id == "tcm"){      //定时控制器
                                            self.setData({
                                                        tcm:res.data.data[i].current_value
                                            })
                                        }
                                }
                        }
                })
        },

        //定时器调节记录函数0
        bindTimeChange0: function (e) {
                console.log('picker发送选择改变，id值为', e.currentTarget.id)

                this.setData({
                        time: e.detail.value,
                        'tcm.m0.time':e.detail.value
                })
                console.log(this.data.tcm.m0.time);
        },
        bindPickerChange0: function (e) {    //定时器状态调节
                console.log(e)
                console.log('id值为', e.currentTarget.id)
                this.setData({
                        'tcm.index[0]': e.detail.value
                })
        },
        //定时器调节记录函数1
        bindTimeChange1: function (e) {
                this.setData({
                        time: e.detail.value,
                        'tcm.m1.time':e.detail.value
                })
        },
        bindPickerChange1: function (e) {    //定时器状态调节
                this.setData({
                        'tcm.index[1]': e.detail.value
                })
        },
        //定时器调节记录函数2
        bindTimeChange2: function (e) {
                this.setData({
                        time: e.detail.value,
                        'tcm.m2.time':e.detail.value
                })
        },
        bindPickerChange2: function (e) {    //定时器状态调节
                this.setData({
                        'tcm.index[2]': e.detail.value
                })
        },
        //定时器调节记录函数3
        bindTimeChange3: function (e) {
                this.setData({
                        time: e.detail.value,
                        'tcm.m3.time':e.detail.value
                })
        },
        bindPickerChange3: function (e) {    //定时器状态调节
                this.setData({
                        'tcm.index[3]': e.detail.value
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