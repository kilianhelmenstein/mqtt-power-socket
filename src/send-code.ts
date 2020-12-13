var exec = require('child_process').execFile;

function execute(fileName: string, params: string[], path: string) {
   let promise = new Promise((resolve, reject) => {
      exec(fileName, params, { cwd: path }, (err: any, data: any) => {
         if (err) reject(err);
         else resolve(data);
      });

   });
   return promise;
}

export default function sendCode(code: number) {
   return execute('./switch/send-code', [code.toString()], '.');
}