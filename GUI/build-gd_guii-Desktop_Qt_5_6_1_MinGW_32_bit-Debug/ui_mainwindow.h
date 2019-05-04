/********************************************************************************
** Form generated from reading UI file 'mainwindow.ui'
**
** Created by: Qt User Interface Compiler version 5.6.1
**
** WARNING! All changes made in this file will be lost when recompiling UI file!
********************************************************************************/

#ifndef UI_MAINWINDOW_H
#define UI_MAINWINDOW_H

#include <QtCore/QVariant>
#include <QtWidgets/QAction>
#include <QtWidgets/QApplication>
#include <QtWidgets/QButtonGroup>
#include <QtWidgets/QComboBox>
#include <QtWidgets/QHBoxLayout>
#include <QtWidgets/QHeaderView>
#include <QtWidgets/QLabel>
#include <QtWidgets/QLineEdit>
#include <QtWidgets/QMainWindow>
#include <QtWidgets/QMenu>
#include <QtWidgets/QMenuBar>
#include <QtWidgets/QPushButton>
#include <QtWidgets/QStatusBar>
#include <QtWidgets/QTextBrowser>
#include <QtWidgets/QTextEdit>
#include <QtWidgets/QToolBar>
#include <QtWidgets/QVBoxLayout>
#include <QtWidgets/QWidget>

QT_BEGIN_NAMESPACE

class Ui_MainWindow
{
public:
    QWidget *centralWidget;
    QPushButton *connect_pushButton;
    QPushButton *disconnect_pushButton;
    QTextBrowser *show_state_browser;
    QWidget *layoutWidget;
    QVBoxLayout *Public_verticalLayout;
    QHBoxLayout *horizontalLayout_8;
    QLabel *label_7;
    QPushButton *Pushlish_pushButton;
    QLineEdit *Toplic_public_lineEdit;
    QHBoxLayout *horizontalLayout_7;
    QLabel *label_8;
    QComboBox *Public_Qos;
    QTextEdit *Public_message_textEdit;
    QWidget *layoutWidget1;
    QVBoxLayout *Subscribe_verticalLayout;
    QHBoxLayout *horizontalLayout_9;
    QLabel *label_9;
    QPushButton *Subscribe_pushButton;
    QLineEdit *Subscribe_lineEdit;
    QHBoxLayout *horizontalLayout_10;
    QLabel *label_10;
    QComboBox *Subscribe_Qos;
    QTextBrowser *SubscribeMessage_Rece;
    QLabel *label_12;
    QWidget *layoutWidget2;
    QVBoxLayout *verticalLayout;
    QHBoxLayout *horizontalLayout_11;
    QLabel *label_11;
    QComboBox *mqtt_version_comboBox;
    QHBoxLayout *horizontalLayout;
    QLabel *label;
    QComboBox *Host_comboBox;
    QHBoxLayout *horizontalLayout_2;
    QLabel *label_2;
    QComboBox *Port_comboBox;
    QHBoxLayout *horizontalLayout_3;
    QLabel *label_3;
    QLineEdit *IN_Usernae;
    QHBoxLayout *horizontalLayout_4;
    QLabel *label_4;
    QLineEdit *IN_Client_ID;
    QHBoxLayout *horizontalLayout_5;
    QLabel *label_5;
    QLineEdit *IN_Password;
    QHBoxLayout *horizontalLayout_6;
    QLabel *label_6;
    QLineEdit *IN_Timeout;
    QMenuBar *menuBar;
    QMenu *menuLed;
    QToolBar *mainToolBar;
    QStatusBar *statusBar;

    void setupUi(QMainWindow *MainWindow)
    {
        if (MainWindow->objectName().isEmpty())
            MainWindow->setObjectName(QStringLiteral("MainWindow"));
        MainWindow->resize(940, 800);
        centralWidget = new QWidget(MainWindow);
        centralWidget->setObjectName(QStringLiteral("centralWidget"));
        connect_pushButton = new QPushButton(centralWidget);
        connect_pushButton->setObjectName(QStringLiteral("connect_pushButton"));
        connect_pushButton->setGeometry(QRect(331, 21, 93, 28));
        disconnect_pushButton = new QPushButton(centralWidget);
        disconnect_pushButton->setObjectName(QStringLiteral("disconnect_pushButton"));
        disconnect_pushButton->setGeometry(QRect(330, 20, 93, 28));
        show_state_browser = new QTextBrowser(centralWidget);
        show_state_browser->setObjectName(QStringLiteral("show_state_browser"));
        show_state_browser->setGeometry(QRect(50, 260, 271, 291));
        layoutWidget = new QWidget(centralWidget);
        layoutWidget->setObjectName(QStringLiteral("layoutWidget"));
        layoutWidget->setGeometry(QRect(330, 50, 361, 184));
        Public_verticalLayout = new QVBoxLayout(layoutWidget);
        Public_verticalLayout->setSpacing(6);
        Public_verticalLayout->setContentsMargins(11, 11, 11, 11);
        Public_verticalLayout->setObjectName(QStringLiteral("Public_verticalLayout"));
        Public_verticalLayout->setContentsMargins(0, 0, 0, 0);
        horizontalLayout_8 = new QHBoxLayout();
        horizontalLayout_8->setSpacing(6);
        horizontalLayout_8->setObjectName(QStringLiteral("horizontalLayout_8"));
        label_7 = new QLabel(layoutWidget);
        label_7->setObjectName(QStringLiteral("label_7"));

        horizontalLayout_8->addWidget(label_7);

        Pushlish_pushButton = new QPushButton(layoutWidget);
        Pushlish_pushButton->setObjectName(QStringLiteral("Pushlish_pushButton"));
        Pushlish_pushButton->setFocusPolicy(Qt::StrongFocus);

        horizontalLayout_8->addWidget(Pushlish_pushButton);


        Public_verticalLayout->addLayout(horizontalLayout_8);

        Toplic_public_lineEdit = new QLineEdit(layoutWidget);
        Toplic_public_lineEdit->setObjectName(QStringLiteral("Toplic_public_lineEdit"));

        Public_verticalLayout->addWidget(Toplic_public_lineEdit);

        horizontalLayout_7 = new QHBoxLayout();
        horizontalLayout_7->setSpacing(6);
        horizontalLayout_7->setObjectName(QStringLiteral("horizontalLayout_7"));
        label_8 = new QLabel(layoutWidget);
        label_8->setObjectName(QStringLiteral("label_8"));

        horizontalLayout_7->addWidget(label_8);

        Public_Qos = new QComboBox(layoutWidget);
        Public_Qos->setObjectName(QStringLiteral("Public_Qos"));

        horizontalLayout_7->addWidget(Public_Qos);


        Public_verticalLayout->addLayout(horizontalLayout_7);

        Public_message_textEdit = new QTextEdit(layoutWidget);
        Public_message_textEdit->setObjectName(QStringLiteral("Public_message_textEdit"));

        Public_verticalLayout->addWidget(Public_message_textEdit);

        layoutWidget1 = new QWidget(centralWidget);
        layoutWidget1->setObjectName(QStringLiteral("layoutWidget1"));
        layoutWidget1->setGeometry(QRect(330, 260, 361, 289));
        Subscribe_verticalLayout = new QVBoxLayout(layoutWidget1);
        Subscribe_verticalLayout->setSpacing(6);
        Subscribe_verticalLayout->setContentsMargins(11, 11, 11, 11);
        Subscribe_verticalLayout->setObjectName(QStringLiteral("Subscribe_verticalLayout"));
        Subscribe_verticalLayout->setContentsMargins(0, 0, 0, 0);
        horizontalLayout_9 = new QHBoxLayout();
        horizontalLayout_9->setSpacing(6);
        horizontalLayout_9->setObjectName(QStringLiteral("horizontalLayout_9"));
        label_9 = new QLabel(layoutWidget1);
        label_9->setObjectName(QStringLiteral("label_9"));

        horizontalLayout_9->addWidget(label_9);

        Subscribe_pushButton = new QPushButton(layoutWidget1);
        Subscribe_pushButton->setObjectName(QStringLiteral("Subscribe_pushButton"));

        horizontalLayout_9->addWidget(Subscribe_pushButton);


        Subscribe_verticalLayout->addLayout(horizontalLayout_9);

        Subscribe_lineEdit = new QLineEdit(layoutWidget1);
        Subscribe_lineEdit->setObjectName(QStringLiteral("Subscribe_lineEdit"));

        Subscribe_verticalLayout->addWidget(Subscribe_lineEdit);

        horizontalLayout_10 = new QHBoxLayout();
        horizontalLayout_10->setSpacing(6);
        horizontalLayout_10->setObjectName(QStringLiteral("horizontalLayout_10"));
        label_10 = new QLabel(layoutWidget1);
        label_10->setObjectName(QStringLiteral("label_10"));

        horizontalLayout_10->addWidget(label_10);

        Subscribe_Qos = new QComboBox(layoutWidget1);
        Subscribe_Qos->setObjectName(QStringLiteral("Subscribe_Qos"));

        horizontalLayout_10->addWidget(Subscribe_Qos);


        Subscribe_verticalLayout->addLayout(horizontalLayout_10);

        SubscribeMessage_Rece = new QTextBrowser(layoutWidget1);
        SubscribeMessage_Rece->setObjectName(QStringLiteral("SubscribeMessage_Rece"));

        Subscribe_verticalLayout->addWidget(SubscribeMessage_Rece);

        label_12 = new QLabel(centralWidget);
        label_12->setObjectName(QStringLiteral("label_12"));
        label_12->setGeometry(QRect(50, 240, 161, 16));
        layoutWidget2 = new QWidget(centralWidget);
        layoutWidget2->setObjectName(QStringLiteral("layoutWidget2"));
        layoutWidget2->setGeometry(QRect(50, 30, 262, 205));
        verticalLayout = new QVBoxLayout(layoutWidget2);
        verticalLayout->setSpacing(6);
        verticalLayout->setContentsMargins(11, 11, 11, 11);
        verticalLayout->setObjectName(QStringLiteral("verticalLayout"));
        verticalLayout->setContentsMargins(0, 0, 0, 0);
        horizontalLayout_11 = new QHBoxLayout();
        horizontalLayout_11->setSpacing(6);
        horizontalLayout_11->setObjectName(QStringLiteral("horizontalLayout_11"));
        label_11 = new QLabel(layoutWidget2);
        label_11->setObjectName(QStringLiteral("label_11"));

        horizontalLayout_11->addWidget(label_11);

        mqtt_version_comboBox = new QComboBox(layoutWidget2);
        mqtt_version_comboBox->setObjectName(QStringLiteral("mqtt_version_comboBox"));

        horizontalLayout_11->addWidget(mqtt_version_comboBox);


        verticalLayout->addLayout(horizontalLayout_11);

        horizontalLayout = new QHBoxLayout();
        horizontalLayout->setSpacing(6);
        horizontalLayout->setObjectName(QStringLiteral("horizontalLayout"));
        label = new QLabel(layoutWidget2);
        label->setObjectName(QStringLiteral("label"));

        horizontalLayout->addWidget(label);

        Host_comboBox = new QComboBox(layoutWidget2);
        Host_comboBox->setObjectName(QStringLiteral("Host_comboBox"));

        horizontalLayout->addWidget(Host_comboBox);


        verticalLayout->addLayout(horizontalLayout);

        horizontalLayout_2 = new QHBoxLayout();
        horizontalLayout_2->setSpacing(6);
        horizontalLayout_2->setObjectName(QStringLiteral("horizontalLayout_2"));
        label_2 = new QLabel(layoutWidget2);
        label_2->setObjectName(QStringLiteral("label_2"));

        horizontalLayout_2->addWidget(label_2);

        Port_comboBox = new QComboBox(layoutWidget2);
        Port_comboBox->setObjectName(QStringLiteral("Port_comboBox"));

        horizontalLayout_2->addWidget(Port_comboBox);


        verticalLayout->addLayout(horizontalLayout_2);

        horizontalLayout_3 = new QHBoxLayout();
        horizontalLayout_3->setSpacing(6);
        horizontalLayout_3->setObjectName(QStringLiteral("horizontalLayout_3"));
        label_3 = new QLabel(layoutWidget2);
        label_3->setObjectName(QStringLiteral("label_3"));

        horizontalLayout_3->addWidget(label_3);

        IN_Usernae = new QLineEdit(layoutWidget2);
        IN_Usernae->setObjectName(QStringLiteral("IN_Usernae"));

        horizontalLayout_3->addWidget(IN_Usernae);


        verticalLayout->addLayout(horizontalLayout_3);

        horizontalLayout_4 = new QHBoxLayout();
        horizontalLayout_4->setSpacing(6);
        horizontalLayout_4->setObjectName(QStringLiteral("horizontalLayout_4"));
        label_4 = new QLabel(layoutWidget2);
        label_4->setObjectName(QStringLiteral("label_4"));

        horizontalLayout_4->addWidget(label_4);

        IN_Client_ID = new QLineEdit(layoutWidget2);
        IN_Client_ID->setObjectName(QStringLiteral("IN_Client_ID"));

        horizontalLayout_4->addWidget(IN_Client_ID);


        verticalLayout->addLayout(horizontalLayout_4);

        horizontalLayout_5 = new QHBoxLayout();
        horizontalLayout_5->setSpacing(6);
        horizontalLayout_5->setObjectName(QStringLiteral("horizontalLayout_5"));
        label_5 = new QLabel(layoutWidget2);
        label_5->setObjectName(QStringLiteral("label_5"));

        horizontalLayout_5->addWidget(label_5);

        IN_Password = new QLineEdit(layoutWidget2);
        IN_Password->setObjectName(QStringLiteral("IN_Password"));

        horizontalLayout_5->addWidget(IN_Password);


        verticalLayout->addLayout(horizontalLayout_5);

        horizontalLayout_6 = new QHBoxLayout();
        horizontalLayout_6->setSpacing(6);
        horizontalLayout_6->setObjectName(QStringLiteral("horizontalLayout_6"));
        label_6 = new QLabel(layoutWidget2);
        label_6->setObjectName(QStringLiteral("label_6"));

        horizontalLayout_6->addWidget(label_6);

        IN_Timeout = new QLineEdit(layoutWidget2);
        IN_Timeout->setObjectName(QStringLiteral("IN_Timeout"));

        horizontalLayout_6->addWidget(IN_Timeout);


        verticalLayout->addLayout(horizontalLayout_6);

        MainWindow->setCentralWidget(centralWidget);
        layoutWidget->raise();
        layoutWidget->raise();
        layoutWidget->raise();
        connect_pushButton->raise();
        disconnect_pushButton->raise();
        show_state_browser->raise();
        label_12->raise();
        menuBar = new QMenuBar(MainWindow);
        menuBar->setObjectName(QStringLiteral("menuBar"));
        menuBar->setGeometry(QRect(0, 0, 940, 26));
        menuLed = new QMenu(menuBar);
        menuLed->setObjectName(QStringLiteral("menuLed"));
        MainWindow->setMenuBar(menuBar);
        mainToolBar = new QToolBar(MainWindow);
        mainToolBar->setObjectName(QStringLiteral("mainToolBar"));
        MainWindow->addToolBar(Qt::TopToolBarArea, mainToolBar);
        statusBar = new QStatusBar(MainWindow);
        statusBar->setObjectName(QStringLiteral("statusBar"));
        MainWindow->setStatusBar(statusBar);

        menuBar->addAction(menuLed->menuAction());

        retranslateUi(MainWindow);

        QMetaObject::connectSlotsByName(MainWindow);
    } // setupUi

    void retranslateUi(QMainWindow *MainWindow)
    {
        MainWindow->setWindowTitle(QApplication::translate("MainWindow", "MainWindow", 0));
        connect_pushButton->setText(QApplication::translate("MainWindow", "connect", 0));
        disconnect_pushButton->setText(QApplication::translate("MainWindow", "disconnect", 0));
        label_7->setText(QApplication::translate("MainWindow", "Toplic to Public:", 0));
        Pushlish_pushButton->setText(QApplication::translate("MainWindow", "Pushlish", 0));
        label_8->setText(QApplication::translate("MainWindow", "QoS:", 0));
        Public_Qos->clear();
        Public_Qos->insertItems(0, QStringList()
         << QApplication::translate("MainWindow", "0 - Almost Once", 0)
         << QApplication::translate("MainWindow", "1 - Atleast Once", 0)
         << QApplication::translate("MainWindow", "2 - Exactly Once", 0)
        );
        label_9->setText(QApplication::translate("MainWindow", "Toplic to subscribe:", 0));
        Subscribe_pushButton->setText(QApplication::translate("MainWindow", "Subscribe", 0));
        label_10->setText(QApplication::translate("MainWindow", "QoS:", 0));
        Subscribe_Qos->clear();
        Subscribe_Qos->insertItems(0, QStringList()
         << QApplication::translate("MainWindow", "0 - Almost Once", 0)
         << QApplication::translate("MainWindow", "1 - Atleast Once", 0)
         << QApplication::translate("MainWindow", "2 - Exactly Once", 0)
        );
        label_12->setText(QApplication::translate("MainWindow", "Mqtt client states:", 0));
        label_11->setText(QApplication::translate("MainWindow", "Mqtt Version:", 0));
        mqtt_version_comboBox->clear();
        mqtt_version_comboBox->insertItems(0, QStringList()
         << QApplication::translate("MainWindow", "3.1.1", 0)
         << QApplication::translate("MainWindow", "3.1.0", 0)
        );
        label->setText(QApplication::translate("MainWindow", "Host:", 0));
        Host_comboBox->clear();
        Host_comboBox->insertItems(0, QStringList()
         << QApplication::translate("MainWindow", "127.0.0.1", 0)
         << QApplication::translate("MainWindow", "183.230.40.39", 0)
         << QApplication::translate("MainWindow", "iot.eclipse.org", 0)
        );
        label_2->setText(QApplication::translate("MainWindow", "Port:", 0));
        Port_comboBox->clear();
        Port_comboBox->insertItems(0, QStringList()
         << QApplication::translate("MainWindow", "1883", 0)
         << QApplication::translate("MainWindow", "6002", 0)
        );
        label_3->setText(QApplication::translate("MainWindow", "Username:", 0));
        IN_Usernae->setText(QApplication::translate("MainWindow", "194413", 0));
        label_4->setText(QApplication::translate("MainWindow", "Client ID:", 0));
        IN_Client_ID->setText(QApplication::translate("MainWindow", "505578584", 0));
        label_5->setText(QApplication::translate("MainWindow", "Password:", 0));
        IN_Password->setText(QApplication::translate("MainWindow", "se3390", 0));
        label_6->setText(QApplication::translate("MainWindow", "Timeout:", 0));
        IN_Timeout->setText(QApplication::translate("MainWindow", "120", 0));
        menuLed->setTitle(QApplication::translate("MainWindow", "led\346\216\247\345\210\266", 0));
    } // retranslateUi

};

namespace Ui {
    class MainWindow: public Ui_MainWindow {};
} // namespace Ui

QT_END_NAMESPACE

#endif // UI_MAINWINDOW_H
