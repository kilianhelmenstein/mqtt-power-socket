import { AsyncMqttClient } from  "async-mqtt"
import { ISwitch } from '../domain/ISwitch'

interface SwitchCommand {
   status: 'on' | 'off';
}

class Restration {
   constructor(public clientId: string, public topic: string) {}
}

export class MqttSwitch {
   constructor(
      private mqttClient: AsyncMqttClient,
      private topic: string,
      private oneSwitch: ISwitch) {}


   async register(registrationTopic: string): Promise<void> {
      const registrationInfo = {
         clientId: this.mqttClient.options.clientId && "",
         topic: this.topic
      }
      await this.mqttClient.publish(
         registrationTopic,
         Buffer.from(JSON.stringify(registrationInfo)),
         { retain: true });
   }

   async startListen(): Promise<void> {
      this.mqttClient.subscribe(this.topic);
      this.mqttClient.on('message', async (topic: string, message: Buffer) => {
         const isNotMyTopic = topic !== this.topic;
         if (isNotMyTopic)
            return;

         console.log(`Received on ${topic}: ${message}`);
         
         const command = JSON.parse(message.toString()) as SwitchCommand;
         await this.turnOnOrOff(command);
      });
   }

   private async turnOnOrOff(command: SwitchCommand) {
      const shallTurnOn = command.status === 'on';
      if (shallTurnOn)
         await this.oneSwitch.turnOn();
      else
         await this.oneSwitch.turnOff();
   }
}