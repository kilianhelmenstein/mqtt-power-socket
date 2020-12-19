export interface ISwitch {
   turnOn(): Promise<void>;
   turnOff(): Promise<void>;
}