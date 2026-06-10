const { spawn } = require("child_process");
const { scripts } = require("./scripts");
const { app } = require("electron");
const path = require("path");
const { createJSONFile, loadJSONFile } = require("./save");

function run(scriptName, args = []) {
  return new Promise(async (resolve, reject) => {
    console.log("Name of script ran:", scriptName);

    if (scriptName === "save") {
      console.log("Trying to make file");
      createJSONFile(args);
      resolve("");
      return;
    } else if (scriptName === "load") {
      console.log("Trying to read save");
      const data = await loadJSONFile();

      if (data === {}) {
        console.log("file was empty");
        resolve();
        return;
      }
      console.log("File had:", data);
      resolve(data);
      return;
    } else if (scripts[scriptName] === undefined) {
      console.error("Script not found, looked for:", scriptName);
      reject();
    }

    const scriptPath = path.join(
      process.cwd(),
      "src",
      "pythonScripts",
      scripts[scriptName],
    );

    console.log(`Path of script: ${scriptPath}`);

    let pyout = spawn("python", [scriptPath, ...args]);

    pyout.stdout.on("data", (data) => {
      if (data) {
        console.log(`Data: ${data}`);
        resolve(data.toString());
      }
    });

    pyout.stderr.on("data", (data) => {
      console.error(`stderr: ${data}`);
      reject(data);
    });

    pyout.on("close", (code) => {
      console.log(`Closed with code: ${code}`);
      if (code !== 0) {
        console.log("Script Failed");
        reject(new Error("exited with code:", code));
      }
    });
  });
}

async function runScript(scriptName, args = []) {
  return await run(scriptName, args);
}

module.exports = { runScript };
