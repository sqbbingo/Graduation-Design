#-------------------------------------------------
#
# Project created by QtCreator 2019-01-05T20:00:22
#
#-------------------------------------------------

QT       += core gui
QT       += network

greaterThan(QT_MAJOR_VERSION, 4): QT += widgets

TARGET = grand_desig_http
TEMPLATE = app


SOURCES += main.cpp\
        Led_widget.cpp \
    src/switchwidget.cpp

HEADERS  += Led_widget.h \
    src/switchwidget.h

FORMS    += led_widget.ui

CONFIG += mobility
MOBILITY = 

