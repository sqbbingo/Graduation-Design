#include "Led_widget.h"
#include <QApplication>

int main(int argc, char *argv[])
{
    QApplication a(argc, argv);
    Led_Widget w;
    w.show();

    return a.exec();
}
