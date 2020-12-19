#include "./rc-switch/RCSwitch.h"

#include <stdlib.h>
#include <stdio.h>

namespace {
   const int GPIO_17 = 0;   // see wiringPi
}
 
int main(int argc, char *argv[]) {
    const auto repetitions = 3;
    const auto PIN = GPIO_17;

    const auto hasSetupFailed = wiringPiSetup() == -1;
    if (hasSetupFailed)
        return 1;
 
    const auto rcSwitch = RCSwitch();
    rcSwitch.enableTransmit(PIN);
 
    const auto code = atoi(argv[1]);
    const auto codeLength = 24;
    for (const auto r = 0; r < repetitions; r++) {
        rcSwitch.send(code, codeLength);
    }
    return 0;
}
