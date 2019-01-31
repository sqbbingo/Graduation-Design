var config = require('../../config.js');        //导入配置文件
Page({
    data:{
        
    },
    onLoad:function(options){
        //画折线图
        const ctx = wx.createCanvasContext('myCanvas')
        // ctx.moveTo(10, 100)
        // ctx.rect(10, 10, 340, 200)
        // ctx.lineTo(10, 210)

        

        wx.request({
                    url:"https://api.heclouds.com/devices/516161018/datapoints",
                    data: {
                        datastream_id: 'dht',
                        start: timeYesterday(),
                        limit: 480
                    },
                    header:config.config.header,
                    success: function(res) {        //调用成功后的回调函数
                        console.log(res)
                        console.log(res.data.data.datastreams)
                        ctx.moveTo(10,210);   // 向Y正轴方向画线
                        ctx.setLineWidth(1);   // 设置线条宽度
                        ctx.setStrokeStyle('blue');
                        for (var i = 0; i < res.data.data.count; i++) {
                            ctx.lineTo(10+i*1, 170-4*res.data.data.datastreams[0].datapoints[i].value.tem)
                        }
                        ctx.lineTo(350,210)
                        // 竖直往下，至x轴context.lineTo(nextPoint.x, canvasHeight);// 水平往左，至上一个点的在x轴的垂点
                        // ctx.lineTo(currentPoint.x, canvasHeight);
                        // 设置淡紫色
                        // ctx.setFillStyle('#f0f8ff');
                        // 实现闭合与x轴之前的区域
                        // ctx.fill();
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
        // console.log(timestamp);
        var tomorrow_timetamp = timestamp - 24 * 60 * 60*1000;

        // console.log(tomorrow_timetamp);
        var date = new Date(tomorrow_timetamp);//直接用 new Date(时间戳) 格式转化获得当前时间

        var y = date.getFullYear() + '-';
        var m = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1):date.getMonth()+1) + '-';
        var d = date.getDate() + 'T';
        var hms = date.toTimeString().substr(0, 8);
        return y+m+d+hms;
}