import * as config from './config.json'
import * as switchesConfig from './switches.json'

import { ISwitchConfiguration } from './ISwitchConfiguration'
import { MqttSwitch } from './controller/MqttSwitch'
import { RcSwitch } from './hardwareAccess/RcSwitch'

import MQTT from "async-mqtt"

async function run() {
   try {
      console.log(`Try connecting to ${config.mqttServer}...`);
      const mqttClient = await MQTT.connectAsync(config.mqttServer, { clientId:config.mqttClientId, protocolId: 'MQIsdp', protocolVersion: 3, connectTimeout:1000 });
      console.log(`Connected to ${config.mqttServer}`);

      const switchConfigs = switchesConfig.switches as ISwitchConfiguration[];
      for (const switchConfig of switchConfigs) {
         const rcSwitch = new RcSwitch(switchConfig.switchGroup, switchConfig.switchUnit);
         const mqttSwitch = new MqttSwitch(mqttClient, switchConfig.topic, rcSwitch);
         mqttSwitch.register(config.registrationTopic);
         mqttSwitch.startListen();
      }
   } catch (e) {
      console.log(`Connection error for ${config.mqttServer}: ${e}`);
   }
}

run();