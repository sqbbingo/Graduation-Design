Page({
        data:{
                var1:"开",
                var2:"关",
                led1_state:"大厅",
                led2_state:"厨房",
                online_state_imag:'/images/offline.png',
                online_state_text:"离线"
        },
        switch1Change: function(e){
                console.log('switch1 发生 change 事件，携带值为',e.detail.value)
                onenet_post(e.detail.value);
                this.setData({
                        var1:e.detail.value?"开":"关"
                })
        },
        switch2Change: function(e){
                console.log('switch2 发生 change 事件，携带值为',e.detail.value)
                this.setData({
                        var2:e.detail.value?"开":"关"
                })
        },
        onLoad:function(options){
                var self = this;
                wx.request({
                                url:'https://api.heclouds.com/devices' + '?online=true&amp',         //服务器地址
                                data: {
                                },
                                header: {
                                        'Content-Type': 'application/json',
                                        "api-key": "Vt2rLag7l9LtcqUn7dT87psfxEY=",
                                },
                                success: function(res) {        //调用成功后的回调函数
                                        if(res.data.data.devices[0].online){
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