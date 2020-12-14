# mqtt-power-socket
Switch your power sockets over MQTT.

## Compile programm to send rc codes
```
g++ -DRPI switch/rc-switch/RCSwitch.cpp switch/send-code.cpp -o switch/send-code -lwiringPi
```

## Add a configuration
Rename `template.config.json` to `config.json` and take your own values. Same for `template.switches.json`.