import { AsyncMqttClient } from 'async-mqtt'
import { ISwitch } from '../domain/ISwitch'

interface SwitchCommand {
   status: 'on' | 'off';
}

type DeviceType = 'onoff' | 'unspecified';

class RegistrationInfo {
   constructor(
      public clientId: string,
      public name: string,
      public topic: string,
      public type: DeviceType
      ) {}
}

export class MqttSwitch {
   constructor(
      private mqttClient: AsyncMqttClient,
      private name: string,
      private topic: string,
      private oneSwitch: ISwitch) {}

   async startListen() {
      await this.mqttClient.subscribe(this.topic);
      this.mqttClient.on('message', async (topic: string, message: Buffer) => {
         const isNotMyTopic = topic !== this.topic;
         if (isNotMyTopic)
            return;

         console.log(`Received on ${topic}: ${message}`);
         
         const command = JSON.parse(message.toString()) as SwitchCommand;
         await this.handleCommand(command);
      });
   }

   async register() {
      const registrationTopic = `registration/${this.topic}`
      const registrationInfo = new RegistrationInfo('power-sockets', this.name, this.topic, 'onoff');
      await this.mqttClient.publish(
         registrationTopic,
         Buffer.from(JSON.stringify(registrationInfo)),
         { qos: 1, retain: true });
   }

   private async handleCommand(command: SwitchCommand) {
      const shallTurnOn = command.status === 'on';
      if (shallTurnOn)
         await this.oneSwitch.turnOn();
      else
         await this.oneSwitch.turnOff();
   }
}