#include "Led_widget.h"
#include "ui_led_widget.h"
#include <QtNetwork>

Led_Widget::Led_Widget(QWidget *parent) :
    QWidget(parent),
    ui(new Ui::Led_Widget)
{
    ui->setupUi(this);

    //创建一个按钮
    CSwitchWidget* wigt1 = new CSwitchWidget(this);
    wigt1->SetPressStyle(GRAPH_PRESSSTYLE_SYSTEM2);
    wigt1->setGeometry(QRect(50, 50, 300, 100));
    wigt1->SetSwitchState(1);

    //创建网络管理
    manager = new QNetworkAccessManager(this);
    request.setRawHeader("api-key","Vt2rLag7l9LtcqUn7dT87psfxEY=");
    request.setRawHeader("Host","api.heclouds.com");
    request.setHeader(QNetworkRequest::ContentTypeHeader, QVariant("text/plain"));//设置post的数据格式，同时防止打印出setheader的调试信息

    connect(wigt1,SIGNAL(StateChanged(int)),this,SLOT(wigt1sataeschanged(int)));//关联按钮的状态
//    connect(manager,&QNetworkAccessManager::finished,
//            this,&MainWindow::replyfinished);//关联管理器的finished信号与自定义的槽
}

Led_Widget::~Led_Widget()
{
    delete ui;
}

void Led_Widget::wigt1sataeschanged(int i)
{
    if(i == 1)//开灯
    {
        post_data.append("ON");
        request.setUrl(QUrl("http://api.heclouds.com/mqtt?topic=/room/led1/ON"));
        manager->post(request,post_data);
    }
    else if(i == 0)//关灯
    {
        post_data.append("OFF");
        request.setUrl(QUrl("http://api.heclouds.com/mqtt?topic=/room/led1/OFF"));
        manager->post(request,post_data);
    }
}

void Led_Widget::on_comboBox_timing1_currentIndexChanged(int index)
{
    //获取定时时间内容并转换为json格式
    json_timing1.insert("timing1_state",index);
    json_timing1.insert("timing1_time",ui->timeEdit_timing1->time().toString());
    json_timing1.insert("/room/led1/state",ui->comboBox_timing1_aim->currentText());

    post_data.append(QString(QJsonDocument(json_timing1).toJson()));
    qDebug() << QString(QJsonDocument(json_timing1).toJson());
    request.setUrl(QUrl("http://api.heclouds.com/mqtt?topic=/room/led1/timing1"));
    manager->post(request,post_data);
}
