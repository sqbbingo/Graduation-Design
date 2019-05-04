/********************************************************************************
** Form generated from reading UI file 'led_widget.ui'
**
** Created by: Qt User Interface Compiler version 5.6.1
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_LED_WIDGET_H
#define UI_LED_WIDGET_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QComboBox>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QTimeEdit>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_Led_Widget
{
public:
    QTimeEdit *timeEdit_timing1;
    QComboBox *comboBox_timing1_aim;
    QComboBox *comboBox_timing1;

    void setupUi(QWidget *Led_Widget)
    {
        if (Led_Widget->objectName().isEmpty())
            Led_Widget->setObjectName(QStringLiteral("Led_Widget"));
        Led_Widget->resize(800, 480);
        timeEdit_timing1 = new QTimeEdit(Led_Widget);
        timeEdit_timing1->setObjectName(QStringLiteral("timeEdit_timing1"));
        timeEdit_timing1->setGeometry(QRect(40, 240, 151, 41));
        comboBox_timing1_aim = new QComboBox(Led_Widget);
        comboBox_timing1_aim->setObjectName(QStringLiteral("comboBox_timing1_aim"));
        comboBox_timing1_aim->setGeometry(QRect(200, 240, 91, 41));
        comboBox_timing1 = new QComboBox(Led_Widget);
        comboBox_timing1->setObjectName(QStringLiteral("comboBox_timing1"));
        comboBox_timing1->setGeometry(QRect(300, 240, 91, 41));

        retranslateUi(Led_Widget);

        QMetaObject::connectSlotsByName(Led_Widget);
    } // setupUi

    void retranslateUi(QWidget *Led_Widget)
    {
        Led_Widget->setWindowTitle(QApplication::translate("Led_Widget", "Led_Widget", 0));
        comboBox_timing1_aim->clear();
        comboBox_timing1_aim->insertItems(0, QStringList()
         << QApplication::translate("Led_Widget", "OFF", 0)
         << QApplication::translate("Led_Widget", "ON", 0)
        );
        comboBox_timing1->clear();
        comboBox_timing1->insertItems(0, QStringList()
         << QApplication::translate("Led_Widget", "\344\270\215\345\220\257\345\212\250", 0)
         << QApplication::translate("Led_Widget", "\344\270\200\346\254\241", 0)
         << QApplication::translate("Led_Widget", "\346\257\217\345\244\251", 0)
        );
    } // retranslateUi

};

namespace Ui {
    class Led_Widget: public Ui_Led_Widget {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_LED_WIDGET_H
