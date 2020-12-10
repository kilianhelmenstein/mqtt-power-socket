#include "../rc-switch/RCSwitch.h"

#include <stdlib.h>
#include <stdio.h>

namespace {
   GPIO_17 = 0;   // see wiringPi
}
 
int main(int argc, char *argv[]) {
    int PIN = GPIO_17;

    if (wiringPiSetup() == -1) return 1;
 
    RCSwitch mySwitch = RCSwitch();
    mySwitch.enableTransmit(PIN);
 
    const auto code = atoi(argv[1]);
    mySwitch.send(code, 24);

    return 0;
}