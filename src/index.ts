import * as config from './config.json'
import * as switchesConfig from './switches.json';

import sendCode from './send-code';
import MQTT from "async-mqtt";

interface Switch {
   topic: string;
   codeOn: number;
   codeOff: number;
}

interface SwitchCommand {
   status: 'on' | 'off';
}

async function app() {
   try {
      console.log(`Try connecting to ${config.mqttServer}...`);
      const mqttClient = await MQTT.connectAsync(config.mqttServer, { clientId:config.mqttClientId, protocolId: 'MQIsdp', protocolVersion: 3, connectTimeout:1000 });
      console.log(`Connected to ${config.mqttServer}`);

      const switches: Switch[] = switchesConfig.switches;
      switches.forEach(async (oneSwitch: Switch) => {
         mqttClient.subscribe(oneSwitch.topic);

         mqttClient.on('message', async function(topic: string, message: Buffer) {
            if (topic === oneSwitch.topic) {
               console.log(`Received on ${topic}: ${message}`);
               const command = JSON.parse(message.toString()) as SwitchCommand;
               const code = command.status === 'on' ? oneSwitch.codeOn : oneSwitch.codeOff;
               console.log(`Switching code ${code}`);
               await sendCode(code);
            }
         });
      });
   } catch (e) {
      console.log(`Connection error for ${config.mqttServer}: ${e}`);
   }
}

app();