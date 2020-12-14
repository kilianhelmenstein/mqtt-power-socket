var exec = require('child_process').execFile;

function execute(fileName: string, params: string[], path: string): Promise<void> {
   let promise = new Promise<void>((resolve, reject) => {
      exec(fileName, params, { cwd: path }, (err: any, data: any) => {
         if (err) reject(err);
         else resolve(data);
      });

   });
   return promise;
}

export default function sendCode(code: number): Promise<void> {
   return execute('./switch/send-code', [code.toString()], '.');
}