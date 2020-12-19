import { execFile } from 'child_process'
import { ISwitch } from '../domain/ISwitch'

export class RcSwitch implements ISwitch {
   constructor(private codeForOn: number, private codeForOff: number) {}

   async turnOn(): Promise<void> {
      await sendRfCode(this.codeForOn);
   }

   async turnOff(): Promise<void> {
      await sendRfCode(this.codeForOff);
   }
}

function sendRfCode(code: number): Promise<void> {
   return executeFileAsync('./switch/send-code', [code.toString()], '.');
}

function executeFileAsync(fileName: string, params: string[], path: string): Promise<void> {
   return new Promise<void>((resolve, reject) => {
      execFile(fileName, params, { cwd: path }, (err: any, data: any) => {
         if (err) reject(err);
         else resolve(data);
      });
   });
}