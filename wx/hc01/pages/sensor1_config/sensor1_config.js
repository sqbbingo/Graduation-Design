var config = require('../../config.js');        //导入配置文件
Page({
    data:{
            light_state:'/images/light0.png',
    },
    onLoad:function(options){
        var self = this;
        //画折线图
        const ctx = wx.createCanvasContext('myCanvas')
        // ctx.moveTo(10, 100)
        // ctx.rect(10, 10, 340, 200)
        // ctx.lineTo(10, 210)

        console.log(timeYesterday());

        wx.request({
                    url:"https://api.heclouds.com/devices/516161018/datapoints",
                    data: {
                        datastream_id: 'dht',
                        start: timeYesterday(),
                        limit: 480
                    },
                    header:config.config.header,
                    success: function(res) {        //调用成功后的回调函数
                        console.log(res);
                        console.log(res.data.data.datastreams)
                        //画温度折线图
                        ctx.setLineWidth(1);   // 设置线条宽度
                        ctx.setStrokeStyle('blue');
                        ctx.moveTo(10,170-4*res.data.data.datastreams[0].datapoints[0].value.tem);   // 向Y正轴方向画线
                        for (var i = 1; i < res.data.data.count; i++) {
                            if (res.data.data.datastreams[0].datapoints[i].value.tem == 0) {
                                ctx.moveTo(10+i*1, 170-4*res.data.data.datastreams[0].datapoints[i+1].value.tem)
                            }else{
                                ctx.lineTo(10+i*1, 170-4*res.data.data.datastreams[0].datapoints[i].value.tem)
                            }
                        }
                        ctx.stroke()
                        ctx.draw(true)
                        //画湿度折线图
                        ctx.setLineWidth(1);   // 设置线条宽度
                        ctx.setStrokeStyle('red');
                        ctx.moveTo(10,170-4*res.data.data.datastreams[0].datapoints[0].value.hum);   // 向Y正轴方向画线
                        for (var i = 1; i < res.data.data.count; i++) {
                            if (res.data.data.datastreams[0].datapoints[i].value.hum == 0) {
                                ctx.moveTo(10+i*1, 170-4*res.data.data.datastreams[0].datapoints[i+1].value.hum)
                            }else{
                                ctx.lineTo(10+i*1, 170-4*res.data.data.datastreams[0].datapoints[i].value.hum)
                            }
                        }
                        ctx.stroke()
                        ctx.draw(true)
                    }
        })
        var lineCount = 6;
        var estimateRatio = 3;
        var ratio = 100 / lineCount;  
        for (var i = 1; i < lineCount; i++) {
            ctx.moveTo(0,10+40*i);   // 向Y正轴方向画线
            ctx.lineTo(370,10+40*i);   // 设置属性
            ctx.setLineWidth(0.1);   // 设置颜色
            ctx.setStrokeStyle('gray');
            ctx.stroke();   // 标注数值
            // ctx.setFillStyle(gray);
            ctx.fillText(10*(4-i),12,7+40*i);
        }
        // ctx.moveTo(0,10+40*5);   // 向Y正轴方向画线
        // ctx.lineTo(370,10+40*5);   // 设置属性
        ctx.fillText(-10,12,207);
        ctx.draw(true);

        //设备room1各模块状态查询
        wx.request({
                url:'https://api.heclouds.com/devices/' + config.config.deviceid + '/datastreams',
                data:{},
                header: config.config.header,   //请求头部
                success: function(res) {        //调用成功后的回调函数
                        console.log(res);
                        for (var i = res.data.data.length - 1; i >= 0; i--) {
                               if (res.data.data[i].id == "light"){
                                    if (res.data.data[i].current_value.satate == "1") {}
                                    self.setData({
                                            light_state:'/images/light0.png'
                                    })
                               }else{
                                    if (res.data.data[i].current_value.satate == "1") {}
                                    self.setData({
                                            light_state:'/images/light1.png'
                                    })
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
// 获取当前时间减一天的时间
function timeYesterday() {
        var timestamp = new Date().getTime();
        console.log(timestamp);
        var tomorrow_timetamp = timestamp - 24 * 60 * 60*1000;

        console.log(tomorrow_timetamp);
        var date = new Date(tomorrow_timetamp);//直接用 new Date(时间戳) 格式转化获得当前时间
        console.log(date);
        var y = date.getFullYear() + '-';
        var m = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1):date.getMonth()+1) + '-';
        var d = (date.getDate() < 10 ? '0'+(date.getDate()):date.getDate()) + 'T';
        var hms = date.toTimeString().substr(0, 8);
        console.log(d);
        return y+m+d+hms;
}