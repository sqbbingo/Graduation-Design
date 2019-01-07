#ifndef LED_WIDGET_H
#define LED_WIDGET_H

#include <QWidget>
#include "src/switchwidget.h"
#include <QtNetwork>
#include <QJsonObject>

namespace Ui {
class Led_Widget;
}

class Led_Widget : public QWidget
{
    Q_OBJECT

public:
    explicit Led_Widget(QWidget *parent = 0);
    ~Led_Widget();

private:
    Ui::Led_Widget *ui;
    QNetworkAccessManager *manager;
    QNetworkRequest request;
    QJsonObject json_timing1;
    QByteArray post_data;

private slots:
    void wigt1sataeschanged(int i);
    void on_comboBox_timing1_currentIndexChanged(int index);
};

#endif // LED_WIDGET_H
