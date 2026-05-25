const { spawn } = require("child_process");
const { scripts } = require("./scripts");

const path = require("path");
const scriptPath = path.join(__dirname, "../src/pythonScripts/");

function run(scriptName, args = []) {
  return new Promise((resolve, reject) => {
    const myPath = [path.join(scriptPath, scripts[scriptName]), ...args];
    let pyout = spawn("python", myPath);
    let res = "";

    pyout.stdout.on("data", (data) => {
      if (data) {
        //console.log(`Data: ${data}`);
        resolve(data.toString());
      }
    });

    pyout.stderr.on("data", () => {
      //console.error(`stderr: ${data}`);
      reject(-1);
    });

    pyout.on("close", (code) => {
      //console.log(`Closed with code: ${code}`);
      if (code !== 0) {
        reject("exited with code:", code);
      }
    });
  });
}

async function runScript(scriptName, args = []) {
  return await run(scriptName, args);
}

module.exports = { runScript };
