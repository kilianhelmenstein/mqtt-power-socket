# mqtt-power-socket
Switch your power sockets over MQTT.

## Compile programm to send rc codes
```
g++ -DRPI switch/rc-switch/RCSwitch.cpp switch/send-code.cpp -o switch/send-code -lwiringPi
```
