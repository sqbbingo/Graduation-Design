var config = require('../../config.js');        //导入配置文件

Page({
		data:{
				array: ['无操作','关闭一次','连续关闭', '开启一次', '连续开启'],
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
				},
				items: [
					{name: 'USA', value: '美国'},
					{name: 'CHN', value: '中国', checked: 'true'},
					{name: 'BRA', value: '巴西'},
					{name: 'TUR', value: '法国'},
				]
		},

		//确认按钮，更新灯的状态
		button_ok(e) {
				var self = this;
				
				config.config.PublishTheme("/room1/ws2812",self.data.message.ws2812);
                config.config.PublishTheme("/room1/subscribe",self.data.message.mqtt.subscribe);
				// wx.navigateTo({
				//         url: '/pages/led/led',
				// })              //跳转到led界面
				wx.showToast({
						title: '5秒后生效',
						icon: 'success',
						duration: 5000//持续的时间
			   })
		},

		// 取消按钮-直接跳转到主页
		button_cancel(e) {
				// wx.navigateTo ({
				//         url: '/pages/led/led',
				// })              //跳转到led界面
				var self = this;
				wx.showToast({
						title: '取消',
						icon: 'cancel',
						duration: 2000//持续的时间
			   })
				// 查询全彩灯开关、定时、颜色状态
				wx.request({
						url:'https://api.heclouds.com/devices/' + config.config.deviceid + '/datastreams',
						data:{},
						header: config.config.header,   //请求头部
						success: function(res) {        //调用成功后的回调函数
								console.log(res);
								// console.log(res.data.data.length);
								for (var i = res.data.data.length - 1; i >= 0; i--) {
										if (res.data.data[i].id == "ws2812") {
												self.setData({
														'message.ws2812':res.data.data[i].current_value
												})
										}
								}
						}
				})                
		},

		// 改变RGB-R的值
		sliderRchange(e) {
				console.log(e);
				this.setData({
						'message.ws2812.rgb[0]':e.detail.value
				})
		},
		// 改变RGB-G的值
		sliderGchange(e) {
				console.log(e);
				this.setData({
						'message.ws2812.rgb[1]':e.detail.value
				})
		},
		// 改变RGB-B的值
		sliderBchange(e) {
				console.log(e);
				this.setData({
						'message.ws2812.rgb[2]':e.detail.value
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
								for (var i = res.data.data.length - 1; i >= 0; i--) {
										if (res.data.data[i].id == "ws2812") {
												self.setData({
														'message.ws2812':res.data.data[i].current_value
												})
										}else if (res.data.data[i].id == "mqtt") {
                                                self.setData({
                                                        'message.mqtt.subscribe':res.data.data[i].current_value.subscribe
                                                })
                                        }
								}
                                console.log(self.data.message.mqtt.subscribe);

                                // 查询整个产品上的主题
                                wx.request({
                                        url:'https://api.heclouds.com/mqtt/topic',
                                        data:{},
                                        header: config.config.header,   //请求头部
                                        success: function(res) {        //调用成功后的回调函数
                                                console.log(res);
                                                let item = self.data.items;
                                                for (var i = 0; i < res.data.data.length ; i++) {//显示产品的所以主题
                                                    item[i] = {name: 'CHN', value: '中国'};
                                                    item[i].name = i;
                                                    item[i].value = res.data.data[i];
                                                    for (var j = 0; j < self.data.message.mqtt.subscribe.length; j++) {//勾选已经订阅的主题
                                                        if(item[i].value == self.data.message.mqtt.subscribe[j]){
                                                            item[i].checked = 'true';
                                                        }
                                                    }
                                                }
                                                self.setData({
                                                    'items':item
                                                })
                                        }
                                })//主题查询end                                 
						}
				})           
		},

		//定时器调节记录函数0
		bindTimeChange0: function (e) {
				console.log('picker发送选择改变，id值为', e)

				this.setData({
						'message.ws2812.time[0]':e.detail.value
				})
		},
		bindPickerChange0: function (e) {    //定时器状态调节
				console.log(e)
				this.setData({
						'message.ws2812.index[0]': e.detail.value
				})
		},
		//定时器调节记录函数1
		bindTimeChange1: function (e) {
				this.setData({
						'message.ws2812.time[1]':e.detail.value
				})
		},
		bindPickerChange1: function (e) {    //定时器状态调节
				this.setData({
						'message.ws2812.index[1]': e.detail.value
				})
		},
		//定时器调节记录函数2
		bindTimeChange2: function (e) {
				this.setData({
						'message.ws2812.time[2]':e.detail.value
				})
		},
		bindPickerChange2: function (e) {    //定时器状态调节
				this.setData({
						'message.ws2812.index[2]': e.detail.value
				})
		},
		//定时器调节记录函数3
		bindTimeChange3: function (e) {
				this.setData({
						'message.ws2812.time[3]':e.detail.value
				})
		},
		bindPickerChange3: function (e) {    //定时器状态调节
				this.setData({
						'message.ws2812.index[3]': e.detail.value
				})
		},
        //主题订阅选项
        checkboxChange(e) {
                console.log('checkbox发生change事件，携带value值为：', e.detail.value)
                let subs = [];
                for (var i = 0; i < e.detail.value.length; i++) {
                    subs[i] = this.data.items[parseInt(e.detail.value[i])].value;
                }
                this.setData({
                    'message.mqtt.subscribe':subs
                })
                console.log(this.data.message.mqtt.subscribe);
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