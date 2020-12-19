#include "./rc-switch/RCSwitch.h"

#include <stdlib.h>
#include <stdio.h>

namespace {
   const int GPIO_17 = 0;   // see wiringPi
}

int main(int argc, char *argv[]) {
    const auto repetitions = 2;
    const auto PIN = GPIO_17;

    const auto hasSetupFailed = wiringPiSetup() == -1;
    if (hasSetupFailed)
        return 1;

    auto rcSwitch = RCSwitch();
    rcSwitch.enableTransmit(PIN);

    const auto group = argv[1];
    const auto unit = argv[2];
    const auto shallTurnOn = atoi(argv[3]) == 1;
    for (auto r = 0; r < repetitions; r++) {
        if (shallTurnOn)
            rcSwitch.switchOn(group, unit);
        else 
            rcSwitch.switchOff(group, unit);
    }

    return 0;
}