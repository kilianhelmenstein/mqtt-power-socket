import sendCode from './send-code';
import * as switches from './switches.json';

import MQTT from "async-mqtt";

async function app() {
   const mqttClient = await MQTT.connectAsync("tcp://raspberryby:1883");
   mqttClient.publish
}