import { execFile } from 'child_process'
import { ISwitch } from '../domain/ISwitch'

export class RcSwitch implements ISwitch {
   constructor(private group: string, private unit: string) {}

   async turnOn(): Promise<void> {
      await sendRfCode(this.group, this.unit, 1);
   }

   async turnOff(): Promise<void> {
      await sendRfCode(this.group, this.unit, 0);
   }
}

function sendRfCode(group: string, unit: string, status: number): Promise<void> {
   return executeFileAsync('./switch/send-code', [group, unit, status.toString()], '.');
}

function executeFileAsync(fileName: string, params: string[], path: string): Promise<void> {
   return new Promise<void>((resolve, reject) => {
      execFile(fileName, params, { cwd: path }, (err: any, data: any) => {
         if (err) reject(err);
         else resolve(data);
      });
   });
}